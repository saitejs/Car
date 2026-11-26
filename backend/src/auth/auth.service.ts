import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) { }

  // ✅ Login logic
  async login(phone: string) {
    return this.prisma.user.findUnique({
      where: { phone },
    });
  }

  // ✅ Get all users
  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async getUserCount() {
    return this.prisma.user.count();
  }

  async makeAdmin(id: number) {
    return this.prisma.user.update({
      where: { id },
      data: {
        role: "ADMIN",
      },
    });
  }

  async register(data: any) {

    const existing =
      await this.prisma.user.findFirst({

        where: {

          OR: [

            {
              phone: data.phone
            },

            {
              aadhaarNumber:
                data.aadhaarNumber
            },

            {
              drivingLicenseNumber:
                data.drivingLicenseNumber
            }
          ]
        }
      });

    if (existing) {

      throw new BadRequestException(

        "User already exists"

      );
    }
    const user =
      await this.prisma.user.create({

        data: {

          name:
            data.name,

          email:
            data.email,

          phone:
            data.phone,

          aadhaarNumber:
            data.aadhaarNumber || null,

          drivingLicenseNumber:
            data.drivingLicenseNumber || null,
        }
      });

    return user;
  }
}