import { BaseEntity } from 'src/models/base.entity';
import { Order } from 'src/models/orders/entities/order.entity';
import { Column, Entity, OneToMany } from 'typeorm';
@Entity({ name: 'factories' })
export class Factory extends BaseEntity {
  @Column()
  name: string;

  @Column({ default: '' })
  number: string;

  @Column({ default: '' })
  address: string;

  @Column({ default: '' })
  email: string;

  @Column({ default: '' })
  ratePerBlock: string;

  // factory Has Many Order
  @OneToMany(() => Order, (order) => order.factory)
  order: Order[];
}
