import { BaseEntity } from 'src/models/base.entity';
import { Order } from 'src/models/orders/entities/order.entity';
import { Payment } from 'src/models/payments/entities/payment.entity';
import { Column, Entity, OneToMany } from 'typeorm';
@Entity({ name: 'warhas' })
export class Warha extends BaseEntity {
  @Column()
  name: string;

  @Column({ default: '' })
  address: string;

  @Column({ default: '' })
  email: string;

  @Column({ default: '' })
  number: string;

  @Column({ default: '' })
  ratePerBlock: string;
  // Warha Has Many Order
  @OneToMany(() => Order, (order) => order.warha)
  order: Order[];

  // Warha Has Many Payments
  @OneToMany(() => Payment, (payment) => payment.warha)
  payments: Payment[];

  
}


