import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService }
  from 'src/prisma/prisma.service';

@Injectable()
export class EmergencyContactService {

  constructor(
    private prisma: PrismaService,
  ) { }

  async addContact(
    userId: number,
    phone: string,
    relation: string,
  ) {

    // FIND REGISTERED USER
    const contactUser =
      await this.prisma.user.findUnique({

        where: {
          phone,
        },
      });

    if (!contactUser) {

      throw new BadRequestException(
        'User not registered',
      );
    }

    // PREVENT SELF ADD
    if (contactUser.id === userId) {

      throw new BadRequestException(
        'Cannot add yourself',
      );
    }

    // LIMIT 3 CONTACTS
    const existingContacts =
      await this.prisma.emergencyContact.count({

        where: {
          userId,
        },
      });

    if (existingContacts >= 3) {

      throw new BadRequestException(
        'Maximum 3 contacts allowed',
      );
    }

    // CREATE CONTACT
    return this.prisma.emergencyContact.create({

      data: {

        userId,

        contactUserId:
          contactUser.id,

        relation,
      },

      include: {
        contactUser: true,
      },
    });
  }

  async getContacts(userId: number) {

    return this.prisma.emergencyContact.findMany({

      where: {
        userId,
      },

      include: {
        contactUser: true,
      },
    });
  }
}