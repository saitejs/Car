import { Injectable } from '@nestjs/common';
import { CreateContactOwnerDto } from './dto/create-contact-owner.dto';
import { UpdateContactOwnerDto } from './dto/update-contact-owner.dto';

@Injectable()
export class ContactOwnerService {
  create(createContactOwnerDto: CreateContactOwnerDto) {
    return 'This action adds a new contactOwner';
  }

  findAll() {
    return `This action returns all contactOwner`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contactOwner`;
  }

  update(id: number, updateContactOwnerDto: UpdateContactOwnerDto) {
    return `This action updates a #${id} contactOwner`;
  }

  remove(id: number) {
    return `This action removes a #${id} contactOwner`;
  }
}
