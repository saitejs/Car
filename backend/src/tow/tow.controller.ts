import { Controller, Post, Body } from '@nestjs/common';
import { TowService } from './tow.service';
import { CreateTowDto } from './dto/create-tow.dto';
import { Param, Get } from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common';

@Controller('tow')
export class TowController {
  constructor(private readonly towService: TowService) { }

  @Post('create')
  create(@Body() createTowDto: CreateTowDto) {
    return this.towService.create(createTowDto);
  }
  @Post('release/:towId')
  releaseVehicle(
    @Param('towId', ParseIntPipe) towId: number
  ) {
    return this.towService.releaseVehicle(towId);
  }

  @Get('active/:numberPlate')
  getActiveTow(@Param('numberPlate') numberPlate: string) {
    return this.towService.getActiveTow(numberPlate);
  }
  @Get('active')
  getActiveTows() {
    return this.towService.getActiveTows();
  }
}