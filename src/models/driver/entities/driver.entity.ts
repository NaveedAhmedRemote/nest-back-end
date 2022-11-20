import { BaseEntity } from 'src/models/base.entity';
import { Truck } from 'src/models/truck/entities/truck.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'drivers' })
export class Driver extends BaseEntity {
  @Column()
  name: string;

  @Column({ default: '' })
  number: string;

  @Column({ default: false })
  isDriving: boolean;

    // driver has Many Truck
    @ManyToOne(() => Truck, (truck) => truck.driver)
    truck: Truck;
}
