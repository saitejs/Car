import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) { }

  @Get('users')
  getUsers() {
    return this.analyticsService.getUserGrowth();
  }


  @Get("activity")
  getActivity() {
    return this.analyticsService.getActivityFeed();
  }
  @Get('vehicles')
  getVehicles() {
    return this.analyticsService.getVehicleGrowth();
  }

  @Get('messages')
  getMessages() {
    return this.analyticsService.getMessageGrowth();
  }
}