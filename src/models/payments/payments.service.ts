import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Repository } from 'typeorm';
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
    return 'This action adds a new payment';
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    // return this.repository.findOneBy(id);
  }
  async findOnebyMonth(warhaId) {
    console.log('WarhaId In PaymentsService', typeof warhaId, warhaId);
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

  async paymentsOfCurrentMonth(warhaId) {
    const payment = await this.repository.find({
      where: { warha: warhaId },
      relations: {
        warha: true,
      },
    });
  }
}
