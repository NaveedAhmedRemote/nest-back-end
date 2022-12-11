import { BaseEntity } from 'src/models/base.entity';
import { Warha } from 'src/models/warha/entities/warha.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { PAYMENT_STATUS } from '../enums/payment-status.enums';

@Entity({ name: 'payments' })
export class Payment extends BaseEntity {
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
  @ManyToOne(() => Warha, (warha) => warha.payments)
  warha: Warha;

  @Column({ nullable: true })
  billMonth: Date;
}
