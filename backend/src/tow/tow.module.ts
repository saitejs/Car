import { Module } from '@nestjs/common';
import { TowService } from './tow.service';
import { TowController } from './tow.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TowController],
  providers: [TowService],
})
export class TowModule { }
