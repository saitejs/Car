import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OfficerService {
  constructor(private prisma: PrismaService) { }

  // ✅ Register Officer
  async registerOfficer(data: any) {
    return this.prisma.officer.create({
      data: {
        name: data.name,
        designation: data.designation,
        policeStation: data.policeStation,
        location: data.location,
        officerId: data.officerId,
        password: data.password,
      },
    });
  }

  // ✅ Login Officer
  async loginOfficer(data: any) {
    return this.prisma.officer.findFirst({
      where: {
        officerId: data.officerId,
        password: data.password,
      },
    });
  }

  // ✅ Get all officers
  async getAllOfficers() {
    return this.prisma.officer.findMany();
  }

  async getLeaderboard() {

    return this.prisma.officer.findMany({

      orderBy: {
        reputationScore: 'desc',
      },

      take: 10,
    });
  }
}