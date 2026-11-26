import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { CallDto } from './dto/call.dto';

@Controller('vehicle')
export class VehicleController {
    constructor(private vehicleService: VehicleService) { }

    @Get()
    getAllVehicles() {
        return this.vehicleService.getAllVehicles();
    }

    @Post()
    create(@Body() body: CreateVehicleDto) {
        console.log('API HIT')
        return this.vehicleService.createVehicle(body);
    }

    @Post('call')
    callOwner(@Body() body: CallDto) {
        console.log(' Call API HIT')
        return this.vehicleService.callOwner(body);
    }

    @Post("register")
    register(@Body() data: any) {
        return this.vehicleService.registerVehicle(data);
    }
    @Post('add')
    addVehicle(@Body() data: any) {
        return this.vehicleService.addVehicle(data);
    }
    @Post('transfer')
    transferVehicle(@Body() data: any) {
        return this.vehicleService.transferVehicle(data);
    }

    @Get("count")
    getVehicleCount() {
        return this.vehicleService.getVehicleCount();
    }


    @Get(':plate')
    getVehicle(@Param('plate') plate: string) {
        return this.vehicleService.getVehicleByPlate(plate);
    }


    @Get("user/:userId")
    getUserVehicles(@Param("userId") userId: string) {
        return this.vehicleService.getUserVehicles(Number(userId));
    }
    @Get('events/:vehicleNumber')
    getVehicleEvents(
        @Param('vehicleNumber') vehicleNumber: string
    ) {
        return this.vehicleService.getVehicleEvents(
            vehicleNumber
        );
    }

    @Delete(':id')
    deleteVehicle(@Param('id') id: string) {
        return this.vehicleService.deleteVehicle(Number(id));
    }

}
