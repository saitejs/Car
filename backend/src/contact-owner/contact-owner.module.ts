import { Module } from '@nestjs/common';
import { ContactOwnerService } from './contact-owner.service';
import { ContactOwnerController } from './contact-owner.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [
    ContactOwnerController
  ],
  providers: [
    ContactOwnerService,
    PrismaService
  ],
})
export class ContactOwnerModule { }
