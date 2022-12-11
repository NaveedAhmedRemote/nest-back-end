import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import moment from 'moment';
import { Repository } from 'typeorm';
import { CreateWarhaDto } from './dto/create-warha.dto';
import { UpdateWarhaDto } from './dto/update-warha.dto';
import { Warha } from './entities/warha.entity';

@Injectable()
export class WarhaService {
  constructor(
    @InjectRepository(Warha)
    private repository: Repository<Warha>,
  ) { }

  create(createWarhaDto: CreateWarhaDto) {
    return this.repository.save(createWarhaDto);
  }

  findAll() {
    return this.repository.find();
  }

  // async findOne(id: number) {
  //   const wahraByPayment = await this.repository
  //     .createQueryBuilder('warha')
  //     .leftJoinAndSelect('warha.payments', 'payments')
  //     .where('payments.status = :status', { status: 'unpaid' })
  //     .andWhere('warha.id = :id', { id: id })
  //     .orderBy('payments.createdAt', 'ASC')
  //     .getOne();
  //   console.log('Warha', wahraByPayment);
  //   return wahraByPayment;
  // }
  async findOne(id: number) {
    const wahraByPayment = await this.repository.findOne({
      where: { id: id },
      relations: { payments: true }
    })
    return wahraByPayment;
  }

  async update(id: number, updateWarhaDto: UpdateWarhaDto) {
    await this.repository.update(id, updateWarhaDto);
    return await this.repository.findOneBy({ id });
  }

  remove(id: number) {
    return this.repository.delete(id);
  }

  async generateMonthlyBillForWarhas(warhaId) {
    const date = new Date();
    const test1 = await this.repository
      .createQueryBuilder('warhas')
      .select('"*"')
      .where('"createdAt" >= :startDate', {
        startDate: moment(date).startOf('month'),
      })
      .andWhere('"warhaId" = :warhaId', {
        warhaId: warhaId,
      })
      .getRawOne();
    return test1;
  }
}
