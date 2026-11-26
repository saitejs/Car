import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    // Explicitly declare properties to force IDE autocomplete/types
    get message() { return (this as any).message; }
    get user() { return (this as any).user; }
    get vehicle() { return (this as any).vehicle; }

    async onModuleInit() {
        await this.$connect();
    }
}