import { User } from 'src/auth/user/entities/user.entity';
import { BaseEntity } from 'src/models/base.entity';
import { Store } from 'src/models/store/entities/store.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ProfileType } from '../enum/profile-type.enum';

@Entity({ name: 'userProfiles' })
export class UserProfile extends BaseEntity {
  @Column({
    type: 'enum',
    enum: ProfileType,
  })
  profileType: string;

  // Profile has One User
  @ManyToOne(() => User, (user) => user.profiles)
  user: User;

  // One User has Many Store
  // @OneToMany(() => Store, (store) => store.ownerUserProfile)
  // stores: Store[];
}
