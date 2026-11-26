import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';

import { StreakService }
  from './streak.service';

@Controller('streak')
export class StreakController {

  constructor(
    private readonly streakService:
      StreakService,
  ) { }

  @Get(':userId')
  getUserStreak(
    @Param('userId') userId: string,
  ) {

    return this.streakService
      .getUserStreak(
        Number(userId),
      );
  }
}