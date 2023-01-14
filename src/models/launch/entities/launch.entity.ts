import { BaseEntity } from 'src/models/base.entity';
import { MonthlyBill } from 'src/models/monthly-bill/entities/monthly-bill.entity';
import { Order } from 'src/models/orders/entities/order.entity';
import { Column, Entity, OneToMany } from 'typeorm';
@Entity({ name: 'launches' })
export class Launch extends BaseEntity {
  @Column()
  name: string;

  @Column({ default: '' })
  email: string;

  @Column({ default: '' })
  number: string;

  @Column({ default: '' })
  ratePerBlock: string;

  // Launch Has Many MonthlyBill
  @OneToMany(() => MonthlyBill, (monthlyBill) => monthlyBill.launch)
  monthlyBill: MonthlyBill[];

    // Launch Has Many Order
    @OneToMany(() => Order, (order) => order.launch)
    order: Order[];
}
