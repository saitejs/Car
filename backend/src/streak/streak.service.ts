import { Injectable } from '@nestjs/common';

import { PrismaService }
  from 'src/prisma/prisma.service';

@Injectable()
export class StreakService {

  constructor(
    private prisma: PrismaService,
  ) { }

  async getUserStreak(userId: number) {

    const user =
      await this.prisma.user.findUnique({

        where: {
          id: userId,
        },
      });

    // NEVER VIOLATED
    if (!user?.lastViolationDate) {

      return {

        streakDays: 365,

        level:
          '🔥 Elite Safe Driver',
      };
    }

    const today = new Date();

    const lastViolation =
      new Date(
        user.lastViolationDate
      );

    const diffTime =
      today.getTime() -
      lastViolation.getTime();

    const streakDays =
      Math.floor(
        diffTime /
        (1000 * 60 * 60 * 24)
      );

    let level =
      '🚗 Normal Driver';

    if (streakDays >= 30)
      level = '🟢 Safe Driver';

    if (streakDays >= 90)
      level = '🏅 Trusted Driver';

    if (streakDays >= 180)
      level = '🔥 Elite Safe Driver';

    return {

      streakDays,

      level,
    };
  }
}