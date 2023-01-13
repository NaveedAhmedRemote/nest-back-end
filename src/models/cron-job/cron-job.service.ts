import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as moment from 'moment';
import { forEach } from 'src/utils/foreach';
import { MonthlyBillService } from '../monthly-bill/monthly-bill.service';
import { OrdersService } from '../orders/orders.service';
import { PAYMENT_STATUS } from '../payments/enums/payment-status.enums';
import { PaymentsService } from '../payments/payments.service';
import { WarhaService } from '../warha/warha.service';
@Injectable()
export class CronJobService {
  constructor(
    private ordersService: OrdersService,
    private warhaService: WarhaService,
    private monthlyBillService: MonthlyBillService,
  ) {}
  
  @Cron('0 0 1 * *') //Every Month
  // @Cron('*/10 * * * * *') //Every Five Sec
  async generateMonthlyBillForWarha() {
    const todayDate = new Date();
    const startOfMonthCurrentDate = moment(todayDate)
      .startOf('month')
      .format('MM/DD/YYYY');
    const endOfMonthCurrentDate = moment(todayDate)
      .endOf('month')
      .format('MM/DD/YYYY');

    let generateOnce = true;
    if (generateOnce) {
      console.log('START');
      const calculateNoOfBlockEveryWarha: any =
        await this.ordersService.generateMonthlyBillForWarhas();
      await forEach(
        calculateNoOfBlockEveryWarha,
        async (calculateNoOfBlockEveryWarha, index) => {
          const wahraWithPreviousPayment: any = await this.warhaService.findOne(
            calculateNoOfBlockEveryWarha?.warhaId,
          );
          // const t = await this.monthlyBillService.findOnebyMonth(
          //   calculateNoOfBlockEveryWarha?.warhaId,
          // );
          // let paymentStartOfMonth = moment(t?.billMonth)
          //   .startOf('month')
          //   .format('MM/DD/YYYY');

          // let paymentEndOfMonth = moment(t?.billMonth)
          //   .endOf('month')
          //   .format('MM/DD/YYYY');

          // console.log('paymentStartOfMonth', paymentStartOfMonth);
          // console.log('paymentEndOfMonth', paymentEndOfMonth);

          // let startOfMonth = moment(t?.warha?.createdAt)
          //   .startOf('month')
          //   .format('MM/DD/YYYY');

          // let endOfMonth = moment(t?.warha?.createdAt)
          //   .endOf('month')
          //   .format('MM/DD/YYYY');

          const totalBill =
            calculateNoOfBlockEveryWarha?.totalBlock *
            wahraWithPreviousPayment?.ratePerBlock;

          // if (
          //   endOfMonth == endOfMonthCurrentDate &&
          //   startOfMonthCurrentDate == startOfMonth
          // ) {
          //   console.log('Bill Already Generated For ', t?.warha?.name);
          // }
          //  else {
            const dateFromEnd = moment(todayDate).subtract(1,'months').endOf('month').format('MM/DD/YYYY');
          await this.monthlyBillService.create({
            amount: totalBill,
            status: PAYMENT_STATUS.UN_PAID,
            totalBlock: calculateNoOfBlockEveryWarha?.totalBlock,
            warha: calculateNoOfBlockEveryWarha?.warhaId,
            receipt: false,
            billMonth: new Date(dateFromEnd),
          });
          // }
        },
      );
    }
  }
}
