import { BaseEntity } from 'src/models/base.entity';
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
  @ManyToOne(() => Warha, (warha) => warha.payments)
  warha: Warha;


  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  billMonth: Date;
}
