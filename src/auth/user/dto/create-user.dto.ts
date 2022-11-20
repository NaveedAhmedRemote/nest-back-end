import { ProfileType } from 'src/models/user-profile/enum/profile-type.enum';
import { OWNER_OF } from '../enums/user-owner.enum';

export class CreateUserDto {
  username: string;
  mobile?: string;
  ownerOf?: OWNER_OF.DEFAULT;
  email?: string;
  img?: string;
  role?: string;
  password?: string;
  alphaId?: string;
  profileType?: ProfileType.STORE_OWNER;
}
