import {

  BadRequestException,

  Injectable,

} from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ContactOwnerService {

  constructor(
    private prisma: PrismaService
  ) { }

  async sendMessage(data: any) {

    const vehicle =
      await this.prisma.vehicle.findUnique({

        where: {
          numberPlate:
            data.vehicleNumber
        },

        include: {
          user: true
        }
      });

    if (!vehicle) {

      throw new BadRequestException(
        "Vehicle not found"
      );
    }

    if (
      vehicle.userId ===
      Number(data.senderId)
    ) {

      throw new BadRequestException(
        "You cannot message your own vehicle"
      );
    }

    // DAILY LIMIT

    const today =
      new Date();

    today.setHours(
      0, 0, 0, 0
    );

    const todayCount =
      await this.prisma.contactOwnerMessage.count({

        where: {

          senderId:
            Number(data.senderId),

          createdAt: {
            gte: today
          }
        }
      });

    if (todayCount >= 2) {

      throw new BadRequestException(
        "Daily limit reached. You can only send 2 messages per day."
      );
    }

    // CREATE CTO MESSAGE

    const msg =
      await this.prisma.contactOwnerMessage.create({

        data: {

          senderId:
            Number(data.senderId),

          receiverId:
            vehicle.userId,

          vehicleNumber:
            data.vehicleNumber,

          message:
            data.message,
        }
      });

    // CREATE USER NOTIFICATION

    await this.prisma.message.create({

      data: {

        userId:
          vehicle.userId,

        vehicleNumber:
          data.vehicleNumber,

        type: "CTO",

        content:
          `🚗 Someone contacted you regarding vehicle ${data.vehicleNumber}: ${data.message}`,
      }
    });

    return {

      success: true,

      remaining:
        2 - (todayCount + 1),

      msg,
    };
  }

  async getInbox(userId: number) {

    return this.prisma.contactOwnerMessage.findMany({

      where: {
        receiverId: userId
      },

      orderBy: {
        createdAt: "desc"
      }
    });
  }
}