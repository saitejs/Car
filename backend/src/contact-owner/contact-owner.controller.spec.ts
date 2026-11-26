import { Test, TestingModule } from '@nestjs/testing';
import { ContactOwnerController } from './contact-owner.controller';
import { ContactOwnerService } from './contact-owner.service';

describe('ContactOwnerController', () => {
  let controller: ContactOwnerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactOwnerController],
      providers: [ContactOwnerService],
    }).compile();

    controller = module.get<ContactOwnerController>(ContactOwnerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
