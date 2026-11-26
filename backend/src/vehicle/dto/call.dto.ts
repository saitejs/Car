import { IsString } from "class-validator";

export class CallDto {
    @IsString()
    numberPlate: string;
    @IsString()
    callerNumber: string;

}   