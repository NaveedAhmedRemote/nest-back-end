import { Module } from '@nestjs/common';
import { MonthlyBillService } from './monthly-bill.service';
import { MonthlyBillController } from './monthly-bill.controller';
import { MonthlyBill } from './entities/monthly-bill.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MonthlyBill])],
  controllers: [MonthlyBillController],
  providers: [MonthlyBillService],
  exports: [MonthlyBillService],
})
export class MonthlyBillModule {}
