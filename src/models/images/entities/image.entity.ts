import { BaseEntity } from 'src/models/base.entity';
import { Column } from 'typeorm';

export class Image extends BaseEntity {
  @Column()
  name: string;
}
