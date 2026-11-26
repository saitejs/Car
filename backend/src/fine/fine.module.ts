import { Module } from '@nestjs/common';
import { FineService } from './fine.service';
import { FineController } from './fine.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SocketModule } from 'src/socket/socket.module';

@Module({
  imports: [PrismaModule, SocketModule],
  controllers: [FineController],
  providers: [FineService],
})
export class FineModule { }
