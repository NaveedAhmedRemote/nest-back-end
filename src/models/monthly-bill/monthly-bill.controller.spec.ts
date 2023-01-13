import { Test, TestingModule } from '@nestjs/testing';
import { MonthlyBillController } from './monthly-bill.controller';
import { MonthlyBillService } from './monthly-bill.service';

describe('MonthlyBillController', () => {
  let controller: MonthlyBillController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonthlyBillController],
      providers: [MonthlyBillService],
    }).compile();

    controller = module.get<MonthlyBillController>(MonthlyBillController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
