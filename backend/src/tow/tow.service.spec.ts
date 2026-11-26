import { Test, TestingModule } from '@nestjs/testing';
import { TowService } from './tow.service';

describe('TowService', () => {
  let service: TowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TowService],
    }).compile();

    service = module.get<TowService>(TowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
