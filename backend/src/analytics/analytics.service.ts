import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) { }

  async getUserGrowth() {
    const users = await this.prisma.user.findMany({
      select: { createdAt: true },
    });

    return this.groupByDate(users);
  }

  async getVehicleGrowth() {
    const vehicles = await this.prisma.vehicle.findMany({
      select: { createdAt: true },
    });

    return this.groupByDate(vehicles);
  }

  async getMessageGrowth() {
    const messages = await this.prisma.message.findMany({
      select: { createdAt: true },
    });

    return this.groupByDate(messages);
  }

  async getActivityFeed() {
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    const vehicles = await this.prisma.vehicle.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    const messages = await this.prisma.message.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    return [
      ...users.map((u) => ({
        type: "user",
        text: `New user registered (${u.phone})`,
        time: u.createdAt,
      })),
      ...vehicles.map((v) => ({
        type: "vehicle",
        text: `Vehicle added (${v.numberPlate})`,
        time: v.createdAt,
      })),
      ...messages.map((m) => ({
        type: "message",
        text: `Message sent to user ${m.userId}`,
        time: m.createdAt,
      })),
    ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
  }

  private groupByDate(data: any[]) {
    const map: any = {};

    data.forEach((item) => {
      const date = item.createdAt.toISOString().split("T")[0];

      map[date] = (map[date] || 0) + 1;
    });

    return Object.keys(map).map((date) => ({
      date,
      count: map[date],
    }));
  }
}