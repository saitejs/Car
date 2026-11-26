import {
  Controller,
  Get,
} from "@nestjs/common";

import { AdminService }
  from "./admin.service";

@Controller("admin")

export class AdminController {

  constructor(
    private readonly adminService: AdminService
  ) { }

  // 📊 DASHBOARD STATS
  @Get("stats")
  getStats() {

    return this.adminService
      .getStats();
  }

  // 🚨 HIGH RISK USERS
  @Get("high-risk")
  getHighRiskDrivers() {

    return this.adminService
      .getHighRiskDrivers();
  }
}