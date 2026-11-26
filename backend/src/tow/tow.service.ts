import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTowDto } from './dto/create-tow.dto';

@Injectable()
export class TowService {
  constructor(private prisma: PrismaService) { }

  async create(createTowDto: CreateTowDto) {
    const {
      numberPlate,
      reason,
      pickupLocation,
      impoundYard,
      officerId,
      notes,
    } = createTowDto;

    // 1. Find Vehicle
    const vehicle = await this.prisma.vehicle.findUnique({
      where: {
        numberPlate,
      },
    });

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    // 2. Check already towed
    if (vehicle.status === 'TOWED') {
      throw new BadRequestException('Vehicle already towed');
    }

    // 3. Find Officer
    const officer = await this.prisma.officer.findUnique({
      where: {
        id: officerId,
      },
    });

    if (!officer) {
      throw new NotFoundException('Officer not found');
    }

    // 4. Create Tow Record
    const towRecord = await this.prisma.towRecord.create({

      data: {
        vehicleId: vehicle.id,


        officerId: officer.id,

        reason,
        pickupLocation,
        impoundYard,

        notes,
      },
    });

    // 5. Update Vehicle Status
    await this.prisma.vehicle.update({
      where: {
        id: vehicle.id,
      },
      data: {
        status: 'TOWED',
      },
    });

    // 6. CREATE TOW FINE
    await this.prisma.fine.create({

      data: {

        vehicleNumber: vehicle.numberPlate,

        reason: `Tow Penalty - ${reason}`,

        amount: 3000,

        tollLocation: pickupLocation,

        officerName: officer.name,

        officerId: officer.id,

        userId: vehicle.userId,

        isPaid: false,
      },
    });

    // 7. CREATE USER ALERT MESSAGE
    await this.prisma.message.create({

      data: {

        userId: vehicle.userId,

        vehicleNumber: vehicle.numberPlate,

        type: "TOW_ALERT",

        content:
          `🚛 Your vehicle ${vehicle.numberPlate} has been impounded.\n\n` +
          `Reason: ${reason}\n` +
          `Location: ${pickupLocation}\n\n` +
          `Please pay the tow penalty to release your vehicle.`,
      },
    });

    // 8. Create Vehicle Event
    await this.prisma.vehicleEvent.create({

      data: {

        vehicleId: vehicle.id,

        vehicleNumber: vehicle.numberPlate,

        type: 'TOW',

        title: 'Vehicle Towed',

        description:
          `Vehicle towed from ${pickupLocation} to ${impoundYard}`,
      },
    });

    return {
      success: true,
      message: 'Vehicle towed successfully',
      towRecord,
    };
  }

  findAll() {
    return `Return all tow records`;
  }

  findOne(id: number) {
    return `Return tow record #${id}`;
  }

  update(id: number) {
    return `Update tow record #${id}`;
  }

  remove(id: number) {
    return `Delete tow record #${id}`;
  }


  async getActiveTow(numberPlate: string) {
    // 1. Find Vehicle
    const vehicle = await this.prisma.vehicle.findUnique({
      where: {
        numberPlate: numberPlate.toUpperCase().trim(),
      },
    });

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    // 2. Find Active Tow
    const activeTow = await this.prisma.towRecord.findFirst({
      where: {
        vehicleId: vehicle.id,
        isReleased: false,
      },

      include: {
        officer: true,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });

    // 3. No Active Tow
    if (!activeTow) {
      return {
        isTowed: false,
        message: 'Vehicle is not currently impounded',
      };
    }

    // 4. Return Active Tow
    return {
      isTowed: true,

      towRecord: {

        id: activeTow.id,

        reason: activeTow.reason,

        pickupLocation: activeTow.pickupLocation,

        impoundYard: activeTow.impoundYard,

        notes: activeTow.notes,

        createdAt: activeTow.createdAt,

        officer: {
          name: activeTow.officer.name,

          designation: activeTow.officer.designation,

          policeStation: activeTow.officer.policeStation,
        },
      },
    };
  }

  async releaseVehicle(towId: number) {

    // 1. Find Tow Record
    const towRecord = await this.prisma.towRecord.findUnique({
      where: {
        id: towId,
      },

      include: {
        vehicle: true,
      },
    });

    if (!towRecord) {
      throw new NotFoundException("Tow record not found");
    }

    // 2. Already Released
    if (towRecord.isReleased) {
      throw new BadRequestException(
        "Vehicle already released"
      );
    }

    // 3. Check Unpaid Fines
    const unpaidFines = await this.prisma.fine.findMany({
      where: {
        vehicleNumber: towRecord.vehicle.numberPlate,
        isPaid: false,
      },
    });

    if (unpaidFines.length > 0) {

      throw new BadRequestException(
        "Vehicle has unpaid fines"
      );

    }

    // 4. Release Tow Record
    await this.prisma.towRecord.update({
      where: {
        id: towId,
      },

      data: {
        isReleased: true,
        releasedAt: new Date(),
      },
    });

    // 5. Update Vehicle Status
    await this.prisma.vehicle.update({
      where: {
        id: towRecord.vehicle.id,
      },

      data: {
        status: "ACTIVE",
      },
    });

    // 6. Create Vehicle Event
    await this.prisma.vehicleEvent.create({
      data: {
        vehicleId: towRecord.vehicle.id,

        vehicleNumber:
          towRecord.vehicle.numberPlate,

        type: "RELEASE",

        title: "Vehicle Released",

        description:
          "Vehicle released from impound yard",
      },
    });

    return {
      success: true,
      message: "Vehicle released successfully",
    };
  }

  async getActiveTows() {

    return this.prisma.towRecord.findMany({

      where: {
        isReleased: false,
      },

      include: {
        vehicle: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }
}