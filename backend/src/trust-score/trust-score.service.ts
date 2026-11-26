import { Injectable } from '@nestjs/common';

import { PrismaService }
  from 'src/prisma/prisma.service';

@Injectable()
export class TrustScoreService {

  constructor(
    private prisma: PrismaService,
  ) { }

  // ✅ CREATE SCORE EVENT
  async createEvent(data: any) {

    return this.prisma.trustScoreEvent.create({
      data,
    });
  }

  // ✅ CALCULATE USER SCORE
  async getUserScore(userId: number) {

    const events =
      await this.prisma.trustScoreEvent.findMany({

        where: {
          userId,
        },
      });



    const totalPoints =
      events.reduce(
        (sum, event) =>
          sum + event.points,
        0
      );

    // BASE SCORE = 100
    const score =
      100 + totalPoints;

    return {

      score,

      totalEvents:
        events.length,

      events,
    };
  }

  // 🏅 CHECK SAFE DRIVER REWARD
  async getRewardStatus(userId: number) {

    const scoreData =
      await this.getUserScore(userId);

    const severeViolations =
      scoreData.events.filter((event) =>

        event.reason.includes(
          "Drink and Drive"
        ) ||

        event.reason.includes(
          "Hit and Run"
        )
      );

    const eligible =
      scoreData.score >= 95 &&
      severeViolations.length === 0;

    return {

      eligible,

      badge:
        eligible
          ? "🏅 Safe Driver"
          : null,

      trustScore:
        scoreData.score,

      severeViolations:
        severeViolations.length,
    };
  }
  // ✅ CREATE POSITIVE SCORE EVENT
  async createPositiveEvent(data: any) {

    const positivePoints: any = {

      "PUC_RENEWED": 3,

      "INSURANCE_RENEWED": 5,

      "SAFE_DRIVING": 10,

      "NO_FINE_6_MONTHS": 15,
    };

    const points =
      positivePoints[data.eventType] || 1;

    return this.prisma.trustScoreEvent.create({

      data: {

        userId: data.userId,

        vehicleId: data.vehicleId,

        eventType: data.eventType,

        points,

        reason: data.reason,
      },
    });
  }
}