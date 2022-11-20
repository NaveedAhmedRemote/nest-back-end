import { BaseEntity } from 'src/models/base.entity';
import { Driver } from 'src/models/driver/entities/driver.entity';
import { PetrolPump } from 'src/models/petrol-pump/entities/petrol-pump.entity';
import { Column, Entity, OneToMany } from 'typeorm';
@Entity({ name: 'trucks' })
export class Truck extends BaseEntity {
  @Column()
  number: string;

  @Column({ default: '' })
  loadingCapacity: string;
  //Truck  Has Many driver
  @OneToMany(() => Driver, (driver) => driver.truck)
  driver: Driver[];

  //Truck  Has Many Pumps
  @OneToMany(() => PetrolPump, (petrolPump) => petrolPump.truck)
  pertrolPump: PetrolPump[];
}
