import { Module } from '@nestjs/common';
import { ContactOwnerService } from './contact-owner.service';
import { ContactOwnerController } from './contact-owner.controller';

@Module({
  controllers: [ContactOwnerController],
  providers: [ContactOwnerService],
})
export class ContactOwnerModule {}
