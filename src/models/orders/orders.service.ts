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
  // 
  async findAllOrdersOfLaunchById(id) {
    const date = new Date();
    console.log('Start', moment(date).startOf('month'));
    console.log('endOf', moment(date).endOf('month'));
    // Need To Optimie
    const wholeMonthOrder = await this.repository
      .createQueryBuilder('orders')
      .leftJoinAndSelect('orders.launch', 'launch')
      // .where('orders."createdAt"::date >= current_date')
      .where('orders."createdAt" >= :startDate', {
        startDate: moment(date).startOf('month'),
      })
      .andWhere('orders."createdAt" <= :endDate', {
        endDate: moment(date).endOf('month'),
      })
      .andWhere('"launchId" = :launchId', {
        launchId: id,
      })
      .andWhere('"status" = :status', {
        status: 'delivered',
      })
      .getMany();
    return wholeMonthOrder;
  }
  async findAllOrdersOfFactoryById(id) {
    const date = new Date();
    console.log('Start', moment(date).startOf('month'));
    console.log('endOf', moment(date).endOf('month'));
    // Need To Optimie
    const wholeMonthOrder = await this.repository
      .createQueryBuilder('orders')
      .leftJoinAndSelect('orders.factory', 'factory')
      // .where('orders."createdAt"::date >= current_date')
      .where('orders."createdAt" >= :startDate', {
        startDate: moment(date).startOf('month'),
      })
      .andWhere('orders."createdAt" <= :endDate', {
        endDate: moment(date).endOf('month'),
      })
      .andWhere('"factoryId" = :factoryId', {
        factoryId: id,
      })
      .andWhere('"status" = :status', {
        status: 'received',
      })
      .getMany();
    return wholeMonthOrder;
  }
  async findAll() {
    const company = await this.repository
      .createQueryBuilder('orders')
      .innerJoinAndSelect('orders.warha', 'warha')
      .where('orders."createdAt"::date >= current_date')
      .andWhere('"status" = :status', {
        status: 'delivered',
      })
      .getMany();
    return company;
  }
  async getOrdersOfWarha() {
    const warhasBlockDelieverd = await this.repository
      .createQueryBuilder('orders')
      .innerJoinAndSelect('orders.warha', 'warha')
      .where('orders."createdAt"::date >= current_date')
      .andWhere('"status" = :status', {
        status: 'delivered',
      })
      .getMany();
    return warhasBlockDelieverd;
  }
  async receivedBlockFromFactory() {
    const factoryBlockReceived = await this.repository
      .createQueryBuilder('orders')
      .innerJoinAndSelect('orders.factory', 'factory')
      .where('orders."createdAt"::date >= current_date')
      .andWhere('"status" = :status', {
        status: 'received',
      })
      .getMany();
    return factoryBlockReceived;
  }


  async getOrdersOfLaunches() {
    const launchesBlockDelieverd = await this.repository
      .createQueryBuilder('orders')
      .innerJoinAndSelect('orders.launch', 'launch')
      .where('orders."createdAt"::date >= current_date')
      .andWhere('"status" = :status', {
        status: 'delivered',
      })
      .getMany();
    return launchesBlockDelieverd;
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
    return warha;
  }
  async generateMonthlyBillForFactories() {
    const date = new Date();
    const factory = await this.repository
      .createQueryBuilder('order')
      .select('"factoryId"')
      .addSelect('SUM("noOfBlock")', 'totalBlock')
      .where('"createdAt" >= :startDate', {
        startDate: moment(date).startOf('month'),
      })
      .andWhere('"createdAt" <= :endDate', {
        endDate: moment(date).endOf('month'),
      })
      .andWhere('"status" = :status', {
        status: 'received',
      })
      .groupBy('"factoryId"')
      .getRawMany();
    // .getSql();
    return factory;
  }

  async generateMonthlyBillForLaunches() {
    const date = new Date();
    const launch = await this.repository
      .createQueryBuilder('order')
      .select('"launchId"')
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
      .groupBy('"launchId"')
      .getRawMany();
    // .getSql();
    return launch;
  }

}
