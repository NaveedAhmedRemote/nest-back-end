import { BaseEntity } from 'src/models/base.entity';
import { Truck } from 'src/models/truck/entities/truck.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
@Entity({ name: 'petrolPumps' })
export class PetrolPump extends BaseEntity {
  @Column()
  name: string;

  @Column({ default: '' })
  address: string;

  @Column({ default: '' })
  ownerName: string;

  @Column({ default: '' })
  email: string;

  @Column({ default: '' })
  number: string;

  // driver has Many Truck
  @ManyToOne(() => Truck, (truck) => truck.pertrolPump)
  truck: Truck;
}
