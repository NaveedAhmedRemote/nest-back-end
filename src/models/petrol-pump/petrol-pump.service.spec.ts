import { Test, TestingModule } from '@nestjs/testing';
import { PetrolPumpService } from './petrol-pump.service';

describe('PetrolPumpService', () => {
  let service: PetrolPumpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetrolPumpService],
    }).compile();

    service = module.get<PetrolPumpService>(PetrolPumpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
