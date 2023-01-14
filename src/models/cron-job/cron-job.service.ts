import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as moment from 'moment';
import { forEach } from 'src/utils/foreach';
import { FactoryService } from '../factory/factory.service';
import { LaunchService } from '../launch/launch.service';
import { MonthlyBillService } from '../monthly-bill/monthly-bill.service';
import { OrdersService } from '../orders/orders.service';
import { PAYMENT_STATUS } from '../payments/enums/payment-status.enums';
import { WarhaService } from '../warha/warha.service';
@Injectable()
export class CronJobService {
  constructor(
    private ordersService: OrdersService,
    private warhaService: WarhaService,
    private factoryService: FactoryService,
    private launchService: LaunchService,
    private monthlyBillService: MonthlyBillService,
  ) { }

  @Cron('0 0 1 * *') //Every Month
  // @Cron('*/10 * * * * *') //Every Five Sec
  async generateMonthlyBillForWarha() {
    const todayDate = new Date();
    let generateOnce = true;
    if (generateOnce) {
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
            wahraWithPreviousPayment?.ratePerBlock;

          const dateFromEnd = moment(todayDate).subtract(1, 'months').endOf('month').format('MM/DD/YYYY');
          if (calculateNoOfBlockEveryWarha?.totalBlock != 520) {
            await this.monthlyBillService.create({
              amount: totalBill,
              status: PAYMENT_STATUS.UN_PAID,
              totalBlock: calculateNoOfBlockEveryWarha?.totalBlock,
              warha: calculateNoOfBlockEveryWarha?.warhaId,
              receipt: false,
              billMonth: new Date(dateFromEnd),
            });
          }
        },
      );
      this.generateMonthlyBillForFactories()
    }
  }

  async generateMonthlyBillForFactories() {
    const todayDate = new Date();
    let generateOnce = true;
    if (generateOnce) {
      const calculateNoOfBlockEveryFactory: any =
        await this.ordersService.generateMonthlyBillForFactories();

      await forEach(
        calculateNoOfBlockEveryFactory,
        async (calculateNoOfBlockEveryFactory, index) => {
          const wahraWithPreviousPayment: any = await this.factoryService.findOne(
            calculateNoOfBlockEveryFactory?.factoryId,
          );

          const totalBill =
            calculateNoOfBlockEveryFactory?.totalBlock *
            wahraWithPreviousPayment?.ratePerBlock;

          const dateFromEnd = moment(todayDate).subtract(1, 'months').endOf('month').format('MM/DD/YYYY');
          if (calculateNoOfBlockEveryFactory?.totalBlock != 520) {
            await this.monthlyBillService.create({
              amount: totalBill,
              status: PAYMENT_STATUS.UN_PAID,
              totalBlock: calculateNoOfBlockEveryFactory?.totalBlock,
              factory: calculateNoOfBlockEveryFactory?.factoryId,
              receipt: false,
              billMonth: new Date(dateFromEnd),
            });
          }
        },
      );
      this.generateMonthlyBillForLaunches()
    }
  }
  async generateMonthlyBillForLaunches() {
    const todayDate = new Date();
    let generateOnce = true;
    if (generateOnce) {
      const calculateNoOfBlockEveryLaunch: any =
        await this.ordersService.generateMonthlyBillForLaunches();
      await forEach(
        calculateNoOfBlockEveryLaunch,
        async (calculateNoOfBlockEveryLaunch, index) => {
          const launchPreviousPayment: any = await this.launchService.findOne(
            calculateNoOfBlockEveryLaunch?.launchId,
          );

          const totalBill =
            calculateNoOfBlockEveryLaunch?.totalBlock *
            launchPreviousPayment?.ratePerBlock;

          const dateFromEnd = moment(todayDate).subtract(1, 'months').endOf('month').format('MM/DD/YYYY');
          if (calculateNoOfBlockEveryLaunch?.totalBlock != 520) {
            await this.monthlyBillService.create({
              amount: totalBill,
              status: PAYMENT_STATUS.UN_PAID,
              totalBlock: calculateNoOfBlockEveryLaunch?.totalBlock,
              launch: calculateNoOfBlockEveryLaunch?.launchId,
              receipt: false,
              billMonth: new Date(dateFromEnd),
            });
          }

        },
      );
    }
  }
}
