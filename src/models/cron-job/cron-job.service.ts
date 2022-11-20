import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as moment from 'moment';
import { forEach } from 'src/utils/foreach';
import { OrdersService } from '../orders/orders.service';
import { PAYMENT_STATUS } from '../payments/enums/payment-status.enums';
import { PaymentsService } from '../payments/payments.service';
import { WarhaService } from '../warha/warha.service';
@Injectable()
export class CronJobService {
  constructor(
    private ordersService: OrdersService,
    private warhaService: WarhaService,
    private paymentsService: PaymentsService,
  ) {}
  @Cron('0 0 1 * *') //Every Month
  // @Cron('*/5 * * * * *') //Every Five Sec
  async generateMonthlyBillForWarha() {
    let generateOnce = true;
    if (generateOnce) {
      generateOnce = false;
      const calculateNoOfBlockEveryWarha: any =
        await this.ordersService.generateMonthlyBillForWarhas();

      await forEach(
        calculateNoOfBlockEveryWarha,
        async (calculateNoOfBlockEveryWarha, index) => {
          const wahraWithPreviousPayment: any = await this.warhaService.findOne(
            calculateNoOfBlockEveryWarha?.warhaId,
          );

          const totalBill =
            calculateNoOfBlockEveryWarha?.totalBlock *
            parseInt(wahraWithPreviousPayment?.ratePerBlock);

          await this.paymentsService.create({
            amount: totalBill,
            status: PAYMENT_STATUS.UN_PAID,
            totalBlock: calculateNoOfBlockEveryWarha?.totalBlock,
            warha: calculateNoOfBlockEveryWarha?.warhaId,
            receipt: false,
            billMonth: new Date(),
          });
        },
      );
      console.log('All Bill Generated');
    }
  }
}
