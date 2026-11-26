import { PartialType } from '@nestjs/mapped-types';
import { CreateContactOwnerDto } from './create-contact-owner.dto';

export class UpdateContactOwnerDto extends PartialType(CreateContactOwnerDto) {}
