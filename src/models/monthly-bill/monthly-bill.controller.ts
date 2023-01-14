import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MonthlyBillService } from './monthly-bill.service';
import { CreateMonthlyBillDto } from './dto/create-monthly-bill.dto';
import { UpdateMonthlyBillDto } from './dto/update-monthly-bill.dto';
import { getFirstAndLastDayOfMonth } from 'src/utils/datesOfCurrentMonth';
import *as moment from 'moment';

@Controller('monthly-bill')
export class MonthlyBillController {
  constructor(private readonly monthlyBillService: MonthlyBillService) { }

  @Post('/add-payment')
  create(@Body() createMonthlyBillDto: CreateMonthlyBillDto) {
    return this.monthlyBillService.create(createMonthlyBillDto);
  }

  @Get('/:relation')
  findAll(@Param('relation') relation) {
    const todayDate = new Date();
    const dateFromStart = moment(todayDate).subtract(1, 'months').startOf('month').format('MM/DD/YYYY');
    const dateFromEnd = moment(todayDate).subtract(1, 'months').endOf('month').format('MM/DD/YYYY');
    switch (relation) {
      case 'warha': {
        return this.monthlyBillService.findAllWarha(dateFromStart,dateFromEnd);
      }
      case 'launch': {
        return this.monthlyBillService.findAllLaunchMonthlyBill(dateFromStart,dateFromEnd);
      }
      case 'factory': {
        return this.monthlyBillService.findAllFactoryMonthlyBill(dateFromStart,dateFromEnd);
      }
      default: {
        //statements; 
      }
    }

  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.monthlyBillService.findOne(+id);
  }

  @Patch('/update-payment/:id')
  update(@Param('id') id: string, @Body() updateMonthlyBillDto: UpdateMonthlyBillDto) {
    return this.monthlyBillService.update(+id, updateMonthlyBillDto);
  }

  @Delete('delete-payment/:id')
  remove(@Param('id') id: string) {
    return this.monthlyBillService.remove(+id);
  }

  @Get('PaymentsByWarhaId')
  generateMonthlyBillForWarhas() { }

  @Get('currentMonth-wahra')
  paymentOfCurrentMonthByWarhaId(warhaId) {
    return this.monthlyBillService.paymentsOfCurrentMonthByWarhaId(warhaId);
  }

  @Get('current-month/:date/:relation')
  async paymentOfCurrentMonth(@Param('date') date: string,@Param('relation') relation: string) {
    const toDate = new Date(date);
    const dateRange = await getFirstAndLastDayOfMonth(toDate);
    console.log('Datee', dateRange);
    return this.monthlyBillService.paymentsOfCurrentMonth(
      dateRange.start,
      dateRange.end,
      relation
    );
  }
}
