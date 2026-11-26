import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) { }

  // ✅ Send message
  async sendMessage(data: any) {
    return this.prisma.message.create({
      data: {
        content: data.content,
        userId: data.userId,
      },
    });
  }

  // ✅ TOTAL messages (Admin Dashboard)
  async getTotalMessageCount() {
    return this.prisma.message.count();
  }

  // ✅ UNREAD messages (User badge)
  async getUnreadMessageCount(userId: number) {
    return this.prisma.message.count({
      where: {
        userId,
        isRead: false,
      },
    });
  }

  // ✅ Get messages
  async getMessages(userId: number) {
    return this.prisma.message.findMany({
      where: { userId },
      orderBy: { id: 'desc' },
    });
  }

  // ✅ Mark as read
  async markAsRead(userId: number) {
    return this.prisma.message.updateMany({
      where: { userId },
      data: { isRead: true },
    });
  }
}