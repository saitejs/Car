import { Test, TestingModule } from '@nestjs/testing';
import { ContactOwnerService } from './contact-owner.service';

describe('ContactOwnerService', () => {
  let service: ContactOwnerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactOwnerService],
    }).compile();

    service = module.get<ContactOwnerService>(ContactOwnerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
