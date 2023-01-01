import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

import { Order } from './entities/order.entity';
import * as moment from 'moment';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private repository: Repository<Order>,
  ) {}
  create(createOrderDto) {
    return this.repository.save(createOrderDto);
  }

  async findAllOrdersOfFactorie() {
    const factories = await this.repository
      .createQueryBuilder('orders')
      .leftJoinAndSelect('orders.factory', 'factory')
      .where('orders."createdAt"::date >= current_date')
      .andWhere('"status" = :status', {
        status: 'received',
      })
      .getMany();
    return factories;
  }

  async findAllOrdersOfWarha(id) {
    const date = new Date();
    console.log('Start', moment(date).startOf('month'));
    console.log('endOf', moment(date).endOf('month'));
    // Need To Optimie
    const wholeMonthOrder = await this.repository
      .createQueryBuilder('orders')
      .leftJoinAndSelect('orders.warha', 'warha')
      // .where('orders."createdAt"::date >= current_date')
      .where('orders."createdAt" >= :startDate', {
        startDate: moment(date).startOf('month'),
      })
      .andWhere('orders."createdAt" <= :endDate', {
        endDate: moment(date).endOf('month'),
      })
      .andWhere('"warhaId" = :warhaId', {
        warhaId: id,
      })
      .andWhere('"status" = :status', {
        status: 'delivered',
      })
      .getMany();
    return wholeMonthOrder;
  }
  async findAll() {
    const company = await this.repository
      .createQueryBuilder('orders')
      .leftJoinAndSelect('orders.warha', 'warha')
      .where('orders."createdAt"::date >= current_date')
      .andWhere('"status" = :status', {
        status: 'delivered',
      })
      .getMany();
    return company;
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, updateOrderDto) {
    await this.repository.update(id, updateOrderDto);
    return await this.repository.findOneBy({ id });
  }

  remove(id: number) {
    return this.repository.delete(id);
  }

  async generateMonthlyBill1() {
    const date = new Date();
    const data = await this.repository
      .createQueryBuilder('order')
      .where('"createdAt" >= :startDate', {
        startDate: moment(date).startOf('month'),
      })
      .andWhere('"createdAt" <= :endDate', {
        endDate: moment(date).endOf('month'),
      })
      .getRawMany();
    return data;
  }
  async generateMonthlyBillForWarhas() {
    const date = new Date();
    const warha = await this.repository
      .createQueryBuilder('order')
      .select('"warhaId"')
      .addSelect('SUM("noOfBlock")', 'totalBlock')
      .where('"createdAt" >= :startDate', {
        startDate: moment(date).startOf('month'),
      })
      .andWhere('"createdAt" <= :endDate', {
        endDate: moment(date).endOf('month'),
      })
      .andWhere('"status" = :status', {
        status: 'delivered',
      })
      .groupBy('"warhaId"')
      .getRawMany();
    // .getSql();
    console.log('A', warha);
    return warha;
  }
}
