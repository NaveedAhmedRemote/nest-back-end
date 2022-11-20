import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileType } from 'src/models/user-profile/enum/profile-type.enum';
import { UserProfileService } from 'src/models/user-profile/user-profile.service';
import { CreateUserDto } from './user/dto/create-user.dto';
import { User } from './user/entities/user.entity';
import { UserService } from './user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
    private readonly userProfileService: UserProfileService,
  ) {}

  async create(register: CreateUserDto) {
    const user = await this.userService.create(register);
    await this.userProfileService.create({
      profileType: register?.profileType
        ? register?.profileType
        : ProfileType.STORE_OWNER,
      user: user?.id,
    });
    return user;
  }
  // Generating Token
  generateToken(payload): string {
    console.log('here is Payload', payload);

    return this.jwtService.sign(payload);
  }
}
