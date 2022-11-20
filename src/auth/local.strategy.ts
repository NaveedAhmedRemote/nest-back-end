import { Injectable, NotFoundException } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
// import { User } from 'src/user.entity';
// import { UserService } from 'src/user.service';
import { UserService } from './user/user.service';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super();
  }
  async validate(username: string, password: string): Promise<any> {
    const user = await this.userService.getUserByUsername(username, password);
    console.log('LocalStrategy here___', user);
    if (user === undefined) throw new NotFoundException();
    if (user != undefined && user.password == password) {
      return user;
    } else {
      throw new NotFoundException();
    }
  }
}
