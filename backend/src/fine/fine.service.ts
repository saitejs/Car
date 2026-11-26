import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SocketGateway } from 'src/socket/socket.gateway';

@Injectable()
export class FineService {
  constructor(private prisma: PrismaService, private socketGateway: SocketGateway) { }

  // ✅ Create Fine
  async createFine(data: any) {

    console.log(data);

    // ✅ Find vehicle
    const vehicle = await this.prisma.vehicle.findUnique({

      where: {
        numberPlate: data.numberPlate,
      },

      include: {
        user: true,
      },
    });

    if (!vehicle) {
      throw new Error("Vehicle not found");
    }


    let driverUserId = vehicle.user.id;

    // DEFAULT:
    // owner driving

    if (data.driverType === "OTHER") {

      const otherDriver =
        await this.prisma.user.findFirst({

          where: {

            OR: [

              {
                aadhaarNumber:
                  data.driverIdentity
              },

              {
                drivingLicenseNumber:
                  data.driverIdentity
              }
            ]
          }
        });

      if (!otherDriver) {

        throw new Error(
          "Driver not found"
        );
      }

      driverUserId =
        otherDriver.id;
    }

    // ✅ Create fine
    const fine = await this.prisma.fine.create({

      data: {

        vehicleNumber:
          data.numberPlate,

        reason:
          data.reason,

        amount:
          Number(data.amount),

        tollLocation:
          data.tollLocation,

        officerName:
          data.officerName,

        officerId:
          Number(data.officerId),

        userId:
          vehicle.user.id,

        driverUserId:
          driverUserId,

        driverType:
          data.driverType,

        evidencePhoto:
          data.evidencePhoto,

        latitude:
          data.latitude
            ? Number(data.latitude)
            : null,

        longitude:
          data.longitude
            ? Number(data.longitude)
            : null,


      },
    });

    // 🔥 RESET SAFE DRIVING STREAK
    await this.prisma.user.update({

      where: {
        id: driverUserId,
      },

      data: {
        lastViolationDate: new Date(),
      },
    });

    // 👮 BOOST OFFICER REPUTATION
    await this.prisma.officer.update({

      where: {
        id: Number(data.officerId),
      },

      data: {

        reputationScore: {
          increment: 1,
        },
      },
    });

    // =========================
    // 🚨 VIOLATION SEVERITY ENGINE
    // =========================

    const severityPoints: any = {

      "Parking": -2,

      "Illegal Parking": -2,

      "No Helmet": -3,

      "Signal Jump": -5,

      "Overspeeding": -5,

      "Over Speeding": -5,

      "Wrong Side": -8,

      "Dangerous Driving": -10,

      "Tow": -10,

      "Drink and Drive": -25,

      "Hit and Run": -50,
    };

    // DEFAULT PENALTY
    const points =
      severityPoints[data.reason] || -5;

    // ✅ CREATE TRUST SCORE EVENT
    await this.prisma.trustScoreEvent.create({

      data: {

        userId: driverUserId,

        vehicleId: vehicle.id,

        eventType: "FINE",

        points,

        reason:
          `Traffic Fine - ${data.reason}`,
      },

    });

    // ✅ FIND EXISTING TRUST SCORE

    const existingTrust =
      await this.prisma.trustScore.findUnique({

        where: {
          userId: driverUserId,
        },
      });

    // ✅ IF TRUST SCORE EXISTS

    if (existingTrust) {

      await this.prisma.trustScore.update({

        where: {
          userId: driverUserId,
        },

        data: {

          score: {
            increment: points,
          },
        },
      });

    } else {

      // ✅ CREATE INITIAL TRUST SCORE

      await this.prisma.trustScore.create({

        data: {

          userId: driverUserId,

          score: 100 + points,
        },
      });
    }

    await this.prisma.vehicleEvent.create({
      data: {
        vehicleNumber: data.numberPlate,

        type: "FINE",

        title: "Traffic Fine Issued",

        description: `
Reason: ${data.reason}
Amount: ₹${data.amount}
Officer: ${data.officerName}
    `,
      },
    });

    // ✅ SEND OWNER MESSAGE
    await this.prisma.message.create({

      data: {

        userId: vehicle.userId,

        vehicleNumber: data.numberPlate,

        type: "FINE_ALERT",

        content:
          `🚨 Traffic Fine Issued\n\n` +

          `Vehicle: ${data.numberPlate}\n` +

          `Reason: ${data.reason}\n` +

          `Amount: ₹${data.amount}\n` +

          `Location: ${data.tollLocation}\n\n` +

          `Officer: ${data.officerName}`,
      },
    });

    // ✅ FIND TRUSTED CONTACTS
    const emergencyContacts =
      await this.prisma.emergencyContact.findMany({

        where: {
          userId: vehicle.userId,
        },

        include: {
          contactUser: true,
        },
      });

    // ✅ SEND ALERT TO TRUSTED CONTACTS
    for (const contact of emergencyContacts) {

      await this.prisma.message.create({

        data: {

          userId:
            contact.contactUserId,

          vehicleNumber:
            data.numberPlate,

          type: "EMERGENCY_FINE_ALERT",

          content:
            `🚨 Safety Circle Alert\n\n` +

            `Vehicle ${data.numberPlate} received a traffic fine.\n\n` +

            `Reason: ${data.reason}\n` +

            `Amount: ₹${data.amount}\n\n` +

            `Owner Phone: ${vehicle.user.phone}`,
        },
      });
    }

    this.socketGateway.sendNotification(

      vehicle.userId,

      {

        type: "fine",

        message:
          "🚨 New fine issued",

      }
    );

    return fine;
  }



  // ✅ Get all fines
  async getAllFines() {
    return this.prisma.fine.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getUserFines(userId: number) {
    return this.prisma.fine.findMany({
      where: {
        userId,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async payFine(id: number) {

    // 1. Mark Fine Paid
    const fine = await this.prisma.fine.update({
      where: {
        id,
      },

      data: {
        isPaid: true,
      },
    });

    // 2. Find Active Tow
    const activeTow = await this.prisma.towRecord.findFirst({

      where: {

        vehicle: {
          numberPlate: fine.vehicleNumber,
        },

        isReleased: false,
      },

      include: {
        vehicle: true,
      },
    });

    // 3. Auto Release Vehicle
    if (activeTow) {

      // RELEASE TOW
      await this.prisma.towRecord.update({

        where: {
          id: activeTow.id,
        },

        data: {
          isReleased: true,
          releasedAt: new Date(),
        },
      });

      // UPDATE VEHICLE STATUS
      await this.prisma.vehicle.update({

        where: {
          id: activeTow.vehicle.id,
        },

        data: {
          status: "ACTIVE",
        },
      });

      // CREATE EVENT
      await this.prisma.vehicleEvent.create({

        data: {

          vehicleId: activeTow.vehicle.id,

          vehicleNumber:
            activeTow.vehicle.numberPlate,

          type: "AUTO_RELEASE",

          title: "Vehicle Auto Released",

          description:
            "Vehicle automatically released after tow fine payment.",
        },
      });

      // SEND MESSAGE
      await this.prisma.message.create({

        data: {

          userId: fine.userId || 0,

          vehicleNumber:
            activeTow.vehicle.numberPlate,

          type: "RELEASE",

          content:
            `✅ Your vehicle ${activeTow.vehicle.numberPlate} has been released automatically after payment.`,
        },
      });
    }

    return fine;
  }

  async getOfficerStats(officerId: number) {

    const now = new Date();

    // TODAY
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    // WEEK
    const weekStart = new Date();
    weekStart.setDate(now.getDate() - 7);

    // MONTH
    const monthStart = new Date();
    monthStart.setMonth(now.getMonth() - 1);

    // YEAR
    const yearStart = new Date();
    yearStart.setFullYear(now.getFullYear() - 1);

    // =========================
    // FINE COUNTS
    // =========================

    const today = await this.prisma.fine.count({
      where: {
        officerId,
        createdAt: {
          gte: todayStart,
        },
      },
    });

    const week = await this.prisma.fine.count({
      where: {
        officerId,
        createdAt: {
          gte: weekStart,
        },
      },
    });

    const month = await this.prisma.fine.count({
      where: {
        officerId,
        createdAt: {
          gte: monthStart,
        },
      },
    });

    const year = await this.prisma.fine.count({
      where: {
        officerId,
        createdAt: {
          gte: yearStart,
        },
      },
    });

    // =========================
    // TODAY REVENUE
    // =========================

    const todayFines = await this.prisma.fine.findMany({
      where: {
        officerId,
        createdAt: {
          gte: todayStart,
        },
      },
    });

    const todayRevenue = todayFines.reduce(
      (sum, fine) => sum + fine.amount,
      0
    );

    // =========================
    // WEEK REVENUE
    // =========================

    const weekFines = await this.prisma.fine.findMany({
      where: {
        officerId,
        createdAt: {
          gte: weekStart,
        },
      },
    });

    const weekRevenue = weekFines.reduce(
      (sum, fine) => sum + fine.amount,
      0
    );

    // =========================
    // MONTH REVENUE
    // =========================

    const monthFines = await this.prisma.fine.findMany({
      where: {
        officerId,
        createdAt: {
          gte: monthStart,
        },
      },
    });

    const monthRevenue = monthFines.reduce(
      (sum, fine) => sum + fine.amount,
      0
    );

    // =========================
    // YEAR REVENUE
    // =========================

    const yearFines = await this.prisma.fine.findMany({
      where: {
        officerId,
        createdAt: {
          gte: yearStart,
        },
      },
    });

    const yearRevenue = yearFines.reduce(
      (sum, fine) => sum + fine.amount,
      0
    );

    // =========================
    // LIFETIME REVENUE
    // =========================

    const allFines = await this.prisma.fine.findMany({
      where: {
        officerId,
      },
    });

    const lifetimeRevenue = allFines.reduce(
      (sum, fine) => sum + fine.amount,
      0
    );

    return {
      today,
      week,
      month,
      year,

      todayRevenue,
      weekRevenue,
      monthRevenue,
      yearRevenue,
      lifetimeRevenue,
    };
  }
}