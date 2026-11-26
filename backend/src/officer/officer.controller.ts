import { Body, Controller, Get, Post } from '@nestjs/common';
import { OfficerService } from './officer.service';

@Controller('officer')
export class OfficerController {
  constructor(private officerService: OfficerService) { }

  // ✅ Register
  @Post('register')
  register(@Body() data: any) {
    return this.officerService.registerOfficer(data);
  }

  // ✅ Login
  @Post('login')
  login(@Body() data: any) {
    return this.officerService.loginOfficer(data);
  }

  // ✅ Get officers
  @Get()
  getAll() {
    return this.officerService.getAllOfficers();
  }

  @Get('leaderboard')
  getLeaderboard() {

    return this.officerService
      .getLeaderboard();
  }
}


// Updated Officer login details

// {
//     "id": 1,
//     "name": "Inspector Raj",
//     "designation": "Traffic Inspector",
//     "policeStation": "Surat Traffic Police",
//     "location": "Surat",
//     "officerId": "OFF001",
//     "password": "123456",
//     "createdAt": "2026-05-25T07:50:26.674Z",
//     "reputationScore": 100
// }