import { BaseEntity } from 'src/models/base.entity';
import { Factory } from 'src/models/factory/entities/factory.entity';
import { Launch } from 'src/models/launch/entities/launch.entity';
import { PAYMENT_STATUS } from 'src/models/payments/enums/payment-status.enums';
import { Warha } from 'src/models/warha/entities/warha.entity';
import { Column, CreateDateColumn, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'monthlyBill' })
export class MonthlyBill extends BaseEntity {
  @Column()
  status: PAYMENT_STATUS.DUE;

  @Column({ default: '' })
  amount: string;

  @Column({ default: '' })
  totalBlock: string;

  @Column({ default: '0' })
  previousAmount: string;

  @Column({ default: '' })
  receiveBy: string;

  @Column()
  receipt: boolean;

  // warha has Many Payments
  // @ManyToOne(() => Warha, (warha) => warha.payments)
  // warha: Warha;


  // warha has Many Payments
  @ManyToOne(() => Warha, (warha) => warha.payments)
  warha: Warha;

  // warha has Many Monthly
  @ManyToOne(() => Warha, (warha) => warha.monthlyBill)
  warhaBill: Warha;


  // Factory has Many Payments
  @ManyToOne(() => Factory, (factory) => factory.monthlyBill)
  factory: Factory;


  // Launch has Many Payments
  @ManyToOne(() => Launch, (launch) => launch.monthlyBill)
  launch: Launch;


  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  billMonth: Date;
}
