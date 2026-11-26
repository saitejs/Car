import { Module } from '@nestjs/common';
import { EmergencyContactService } from './emergency-contact.service';
import { EmergencyContactController } from './emergency-contact.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EmergencyContactController],
  providers: [EmergencyContactService],
})
export class EmergencyContactModule { }
