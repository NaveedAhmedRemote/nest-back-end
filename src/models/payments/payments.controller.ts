import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

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

  @Get('currentMonth')
  paymentOfCurrentMonth(warhaId) {
    return this.paymentsService.paymentsOfCurrentMonth(warhaId);
  }
}
