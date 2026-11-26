import { Injectable } from "@nestjs/common";

import { PrismaService }
  from "src/prisma/prisma.service";

@Injectable()

export class AdminService {

  constructor(
    private prisma: PrismaService
  ) { }

  // 📊 ADMIN DASHBOARD STATS
  async getStats() {

    // 💰 TOTAL REVENUE
    const paidFines =
      await this.prisma.fine.findMany({

        where: {
          isPaid: true,
        },
      });

    const revenue =
      paidFines.reduce(

        (acc, fine) =>
          acc + fine.amount,

        0
      );

    // 👮 TOTAL OFFICERS
    const officers =
      await this.prisma.officer.count();

    //Total users 
    const users =
      await this.prisma.user.count();

    // 🚛 ACTIVE TOWS
    const activeTows =
      await this.prisma.towRecord.count({

        where: {
          status: "ACTIVE",
        },
      });

    return {

      revenue,

      officers,

      activeTows,

      users,
    };
  }

  // 🚨 HIGH RISK DRIVERS
  async getHighRiskDrivers() {

    const scores =
      await this.prisma.trustScore.findMany({

        where: {

          score: {
            lte: 60,
          },
        },

        include: {
          user: true,
        },

        orderBy: {
          score: "asc",
        },
      });

    return scores.map((s) => ({

      id: s.user.id,

      phone: s.user.phone,

      trustScore: s.score,
    }));
  }
}