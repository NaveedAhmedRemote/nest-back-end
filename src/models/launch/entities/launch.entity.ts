import { BaseEntity } from 'src/models/base.entity';
import { Column, Entity } from 'typeorm';
@Entity({ name: 'launches' })
export class Launch extends BaseEntity {
  @Column()
  name: string;

  @Column({ default: '' })
  email: string;

  @Column({ default: '' })
  ratePerBlock: string;
}
