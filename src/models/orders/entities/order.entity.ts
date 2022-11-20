import { BaseEntity } from 'src/models/base.entity';
import { Factory } from 'src/models/factory/entities/factory.entity';
import { Warha } from 'src/models/warha/entities/warha.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ORDER_STATUS } from '../enums/order-status.enum';

@Entity({ name: 'orders' })
export class Order extends BaseEntity {
  @Column()
  status: ORDER_STATUS.DUE;

  @Column({ default: 0 })
  noOfBlock: number;

  @Column()
  receipt: boolean;

  // Order has One Warha
  @ManyToOne(() => Warha, (warha) => warha.order)
  warha: Warha;

  // Order has One Factory
  @ManyToOne(() => Factory, (factory) => factory.order)
  factory: Factory;
}
