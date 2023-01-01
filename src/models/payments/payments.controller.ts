import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import * as moment from 'moment';
import { getFirstAndLastDayOfMonth } from 'src/utils/datesOfCurrentMonth';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('/add-payment')
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get('')
  findAll(@Param('relation') relation: string) {
    return this.paymentsService.findAll(relation);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(+id);
  }

  @Patch('/update-payment/:id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @Delete('delete-payment/:id')
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(+id);
  }

  @Get('PaymentsByWarhaId')
  generateMonthlyBillForWarhas() {}

  @Get('currentMonth-wahra')
  paymentOfCurrentMonthByWarhaId(warhaId) {
    return this.paymentsService.paymentsOfCurrentMonthByWarhaId(warhaId);
  }

  @Get('current-month/:date')
  async paymentOfCurrentMonth(@Param('date') date: string) {
    const toDate = new Date(date);
    const dateRange = await getFirstAndLastDayOfMonth(toDate);
    console.log('Datee', dateRange);
    return this.paymentsService.paymentsOfCurrentMonth(
      dateRange.start,
      dateRange.end,
    );
  }
}
