import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { getFirstAndLastDayOfMonth } from 'src/utils/datesOfCurrentMonth';
import { Between, Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private repository: Repository<Payment>,
  ) {}
  create(createPaymentDto: CreatePaymentDto) {
    return this.repository.save(createPaymentDto);
  }

  async findAll(relation) {
    const todayDate = new Date();
    const dateRange = await getFirstAndLastDayOfMonth(todayDate);
    return this.repository.find({
      relations: { warha: true },
      where: {
        createdAt: Between(new Date(dateRange.start), new Date(dateRange.end)),
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
