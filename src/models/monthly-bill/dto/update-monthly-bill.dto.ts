import { PartialType } from '@nestjs/mapped-types';
import { CreateMonthlyBillDto } from './create-monthly-bill.dto';

export class UpdateMonthlyBillDto extends PartialType(CreateMonthlyBillDto) {}
