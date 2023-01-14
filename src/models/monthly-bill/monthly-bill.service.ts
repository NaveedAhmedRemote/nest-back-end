import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Between, Repository } from 'typeorm';
import { UpdatePaymentDto } from '../payments/dto/update-payment.dto';
import { CreateMonthlyBillDto } from './dto/create-monthly-bill.dto';
import { MonthlyBill } from './entities/monthly-bill.entity';

@Injectable()
export class MonthlyBillService {
  constructor(
    @InjectRepository(MonthlyBill)
    private repository: Repository<MonthlyBill>,
  ) { }
  create(createMonthlyBillDto: CreateMonthlyBillDto) {
    return this.repository.save(createMonthlyBillDto);
  }

  // async findAll(relations: {} = { relation: true }) {
  // async findAll(relations) {
  //   console.log("___________________", relations)

  //   const wholeMonthOrder = await this.repository
  //     .createQueryBuilder('MonthlyBill')
  //     .innerJoinAndSelect(`MonthlyBill.${relations}`, `${relations}`)

  //     .where('MonthlyBill."billMonth" >= :startDate', {
  //       startDate: dateFromStart,
  //     })
  //     .andWhere('MonthlyBill."billMonth" <= :endDate', {
  //       endDate: dateFromEnd,
  //     })
  //     .getMany();
  //   console.log("::::", wholeMonthOrder)
  //   return wholeMonthOrder;


  //   return this.repository.find({
  //     relations: relations,
  //     where: {
  //       billMonth: Between(new Date(dateFromStart), new Date(dateFromEnd)),
  //     },
  //   });
  // }
  findAllWarha(dateFromStart, dateFromEnd) {
    return this.repository.find({
      relations: { warha: true },
      where: [{
        billMonth: Between(new Date(dateFromStart), new Date(dateFromEnd)),
      }, {
        warha: !null
      }],
    });
  }

  findAllLaunchMonthlyBill(dateFromStart, dateFromEnd) {
    return this.repository.find({
      relations: { launch: true },
      where: [{
        billMonth: Between(new Date(dateFromStart), new Date(dateFromEnd)),
      }, {
        launch: !null
      }],
    });
  }
  findAllFactoryMonthlyBill(dateFromStart, dateFromEnd) {
    return this.repository.find({
      relations: { factory: true },
      where: [{
        billMonth: Between(new Date(dateFromStart), new Date(dateFromEnd)),
      }, {
        factory: !null
      }],
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

  async paymentsOfCurrentMonth(startDate, endDate,relation) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const monthlybill = await this.repository
      .createQueryBuilder('monthlybill')
      .innerJoinAndSelect(`monthlybill.${relation}`, `${relation}`)
      .where('monthlybill."billMonth" >= :start', {
        start: moment(start).startOf('month'),
      })
      .andWhere('monthlybill."billMonth" <= :end', {
        end: moment(end).endOf('month'),
      })
      .getMany();
    return monthlybill;
  }
}
