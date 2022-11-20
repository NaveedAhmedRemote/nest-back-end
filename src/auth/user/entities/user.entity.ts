import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../models/base.entity';
import { UserProfile } from 'src/models/user-profile/entities/user-profile.entity';
import { Store } from 'src/models/store/entities/store.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({
    unique: true,
    nullable: true,
    update: false,
  })
  @Index()
  alphaId: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  role: string;

  // @Column({ nullable: true })
  // ownerOf: OWNER_OF.DEFAULT;

  // One User has Many Profile
  @OneToMany(() => UserProfile, (profile) => profile.user)
  profiles: UserProfile[];


// user Has Many Stores
  @OneToMany(() => Store, (store) => store.ownerUserProfile)
  stores: Store[];
}
