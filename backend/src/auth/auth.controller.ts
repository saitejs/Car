import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  // ✅ Login
  @Post('login')
  login(@Body() data: any) {
    return this.authService.login(data.phone);
  }

  // ✅ Get all users
  @Get('users')
  getAllUsers() {
    return this.authService.getAllUsers();
  }


  @Get("count")
  getUserCount() {
    return this.authService.getUserCount();
  }


  @Post("register")
  register(@Body() data: any) {
    return this.authService.register(data);
  }




  @Patch("make-admin/:id")
  makeAdmin(@Param("id") id: string) {
    return this.authService.makeAdmin(Number(id));
  }
}



// User login details
// {
//   "id": 1,
//   "name": "Tester2",
//   "email": "Tester2@test.com",
//   "phone": "1313131313",
//   "role": "USER",
//   "createdAt": "2026-05-23T12:14:58.171Z",
//   "lastViolationDate": "2026-05-25T09:48:33.817Z",
//   "aadhaarNumber": "222222222222",
//   "drivingLicenseNumber": "DLTESTER23456"
// }

//  {
//         "id": 2,
//         "name": "Tester3",
//         "email": "Tester3@test.com",
//         "phone": "1414141414",
//         "role": "USER",
//         "createdAt": "2026-05-25T10:07:50.310Z",
//         "lastViolationDate": null,
//         "aadhaarNumber": "333333333333",
//         "drivingLicenseNumber": "DLTESTER34567"
//     },