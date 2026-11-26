import { Body, Controller, Get, Param, Post, } from "@nestjs/common";

import { ContactOwnerService } from "./contact-owner.service";

@Controller("contact-owner")
export class ContactOwnerController {

  constructor(private readonly contactOwnerService: ContactOwnerService) { }

  @Post("send")
  sendMessage(
    @Body() body: any
  ) {

    return this
      .contactOwnerService
      .sendMessage(body);
  }

  @Get("inbox/:userId")
  getInbox(
    @Param("userId") userId: string
  ) {

    return this
      .contactOwnerService
      .getInbox(
        Number(userId)
      );
  }
}