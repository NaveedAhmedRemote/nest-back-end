import { Test, TestingModule } from '@nestjs/testing';
import { WarhaService } from './warha.service';

describe('WarhaService', () => {
  let service: WarhaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WarhaService],
    }).compile();

    service = module.get<WarhaService>(WarhaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
