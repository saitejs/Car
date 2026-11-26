import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContactOwnerService } from './contact-owner.service';
import { CreateContactOwnerDto } from './dto/create-contact-owner.dto';
import { UpdateContactOwnerDto } from './dto/update-contact-owner.dto';

@Controller('contact-owner')
export class ContactOwnerController {
  constructor(private readonly contactOwnerService: ContactOwnerService) {}

  @Post()
  create(@Body() createContactOwnerDto: CreateContactOwnerDto) {
    return this.contactOwnerService.create(createContactOwnerDto);
  }

  @Get()
  findAll() {
    return this.contactOwnerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactOwnerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactOwnerDto: UpdateContactOwnerDto) {
    return this.contactOwnerService.update(+id, updateContactOwnerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactOwnerService.remove(+id);
  }
}
