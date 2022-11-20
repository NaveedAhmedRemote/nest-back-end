import { Test, TestingModule } from '@nestjs/testing';
import { WarhaController } from './warha.controller';
import { WarhaService } from './warha.service';

describe('WarhaController', () => {
  let controller: WarhaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WarhaController],
      providers: [WarhaService],
    }).compile();

    controller = module.get<WarhaController>(WarhaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
