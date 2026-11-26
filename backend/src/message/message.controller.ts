import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) { }

  // ✅ Send message (Admin)
  @Post()
  sendMessage(@Body() data: any) {
    return this.messageService.sendMessage(data);
  }

  @Get("count")
  getTotalCount() {
    return this.messageService.getTotalMessageCount();
  }

  // ✅ Get messages (User)
  @Get(':userId')
  getMessages(@Param('userId') userId: string) {
    return this.messageService.getMessages(Number(userId));
  }

  @Patch("read/:userId")
  markAsRead(@Param("userId") userId: string) {
    return this.messageService.markAsRead(Number(userId));
  }
}