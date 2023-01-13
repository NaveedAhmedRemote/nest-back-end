import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { getFirstAndLastDayOfMonth } from 'src/utils/datesOfCurrentMonth';
import { Repository, Between } from 'typeorm';
import { CreatePaymentDto } from '../payments/dto/create-payment.dto';
import { UpdatePaymentDto } from '../payments/dto/update-payment.dto';
import { CreateMonthlyBillDto } from './dto/create-monthly-bill.dto';
import { UpdateMonthlyBillDto } from './dto/update-monthly-bill.dto';
import { MonthlyBill } from './entities/monthly-bill.entity';

@Injectable()
export class MonthlyBillService {
  constructor(
    @InjectRepository(MonthlyBill)
    private repository: Repository<MonthlyBill>,
  ) {}
  create(createMonthlyBillDto: CreateMonthlyBillDto) {
    return this.repository.save(createMonthlyBillDto);
  }
 
  async findAll(relation) {
    const todayDate = new Date();
    const dateFromStart = moment(todayDate).subtract(1,'months').startOf('month').format('MM/DD/YYYY');
    const dateFromEnd = moment(todayDate).subtract(1,'months').endOf('month').format('MM/DD/YYYY');
    
    return this.repository.find({
      relations: { warha: true },
      where: {
        billMonth: Between(new Date(dateFromStart), new Date(dateFromEnd)),
      },
    });
  }

  findOne(id: number) {
    // return this.repository.findOneBy(id);
  }
  async findOnebyMonth(warhaId) {
    const wa = await this.repository.findOne({
      where: { warha: warhaId },
      relations: { warha: true },
    });
    return wa;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return this.repository.update(id, updatePaymentDto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }

  async paymentsOfCurrentMonthByWarhaId(warhaId) {
    const payment = await this.repository.find({
      where: [{ warha: warhaId }],
      relations: {
        warha: true,
      },
    });
  }

  async paymentsOfCurrentMonth(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const payments = await this.repository
      .createQueryBuilder('payments')
      .leftJoinAndSelect('payments.warha', 'warha')
      .where('payments."createdAt" >= :start', {
        start: moment(start).startOf('month'),
      })
      .andWhere('payments."createdAt" <= :end', {
        end: moment(end).endOf('month'),
      })
      .getMany();
    return payments;
  }
}
