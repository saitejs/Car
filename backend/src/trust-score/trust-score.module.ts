import { Module } from '@nestjs/common';
import { TrustScoreService } from './trust-score.service';
import { TrustScoreController } from './trust-score.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TrustScoreController],
  providers: [TrustScoreService],
})
export class TrustScoreModule { }
