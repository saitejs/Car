import { Test, TestingModule } from '@nestjs/testing';
import { TowController } from './tow.controller';
import { TowService } from './tow.service';

describe('TowController', () => {
  let controller: TowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TowController],
      providers: [TowService],
    }).compile();

    controller = module.get<TowController>(TowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
