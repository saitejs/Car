import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import { TrustScoreService }
  from './trust-score.service';

@Controller('trust-score')
export class TrustScoreController {

  constructor(
    private readonly trustScoreService:
      TrustScoreService,
  ) { }

  @Post()
  createEvent(
    @Body() body: any,
  ) {

    return this.trustScoreService.createEvent(
      body,
    );
  }
  @Post('positive')
  createPositiveEvent(
    @Body() body: any,
  ) {

    return this.trustScoreService
      .createPositiveEvent(body);
  }

  @Get('user/:userId')
  getUserScore(
    @Param('userId') userId: string,
  ) {

    return this.trustScoreService.getUserScore(
      Number(userId),
    );
  }

  @Get('reward/:userId')
  getRewardStatus(
    @Param('userId') userId: string,
  ) {

    return this.trustScoreService
      .getRewardStatus(
        Number(userId),
      );
  }
}