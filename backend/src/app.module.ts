import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehicleModule } from './vehicle/vehicle.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { MessageModule } from './message/message.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { OfficerModule } from './officer/officer.module';
import { FineModule } from './fine/fine.module';
import { TowModule } from './tow/tow.module';
import { EmergencyContactModule } from './emergency-contact/emergency-contact.module';
import { TrustScoreModule } from './trust-score/trust-score.module';
import { StreakModule } from './streak/streak.module';
import { AdminModule } from './admin/admin.module';
import { ContactOwnerModule } from './contact-owner/contact-owner.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [VehicleModule, PrismaModule, AuthModule, MessageModule, AnalyticsModule, OfficerModule, FineModule, TowModule, EmergencyContactModule, TrustScoreModule, StreakModule, AdminModule, ContactOwnerModule, SocketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
