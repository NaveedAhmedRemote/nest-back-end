import { User } from 'src/auth/user/entities/user.entity';
import { BaseEntity } from 'src/models/base.entity';
import { UserProfile } from 'src/models/user-profile/entities/user-profile.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
@Entity({ name: 'stores' })
@Entity({ name: 'stores' })
export class Store extends BaseEntity {
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

  // Store has Many UserProfiles
  @ManyToOne(() => User, (user) => user.stores)
  ownerUserProfile: User;
}
