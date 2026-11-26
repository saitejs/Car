import { IsString } from "class-validator";

export class CreateVehicleDto {
    @IsString()
    numberPlate: string;

    @IsString()
    phone: string;
}
