import { Module } from '@nestjs/common';
import { OfficerService } from './officer.service';
import { OfficerController } from './officer.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [OfficerController],
  providers: [OfficerService],
})
export class OfficerModule { }
