import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import { EmergencyContactService }
  from './emergency-contact.service';

@Controller('emergency-contact')
export class EmergencyContactController {

  constructor(
    private readonly emergencyContactService:
      EmergencyContactService,
  ) { }

  @Post()
  addContact(
    @Body() body: any,
  ) {

    return this.emergencyContactService.addContact(
      body.userId,
      body.phone,
      body.relation,
    );
  }

  @Get(':userId')
  getContacts(
    @Param('userId') userId: string,
  ) {

    return this.emergencyContactService.getContacts(
      Number(userId),
    );
  }
}