import { Test, TestingModule } from '@nestjs/testing';
import { PetrolPumpController } from './petrol-pump.controller';
import { PetrolPumpService } from './petrol-pump.service';

describe('PetrolPumpController', () => {
  let controller: PetrolPumpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetrolPumpController],
      providers: [PetrolPumpService],
    }).compile();

    controller = module.get<PetrolPumpController>(PetrolPumpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
