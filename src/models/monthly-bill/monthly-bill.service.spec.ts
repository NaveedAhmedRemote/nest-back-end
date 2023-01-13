import { Test, TestingModule } from '@nestjs/testing';
import { MonthlyBillService } from './monthly-bill.service';

describe('MonthlyBillService', () => {
  let service: MonthlyBillService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MonthlyBillService],
    }).compile();

    service = module.get<MonthlyBillService>(MonthlyBillService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
