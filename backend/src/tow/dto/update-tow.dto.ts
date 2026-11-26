import { PartialType } from '@nestjs/mapped-types';
import { CreateTowDto } from './create-tow.dto';

export class UpdateTowDto extends PartialType(CreateTowDto) {}
