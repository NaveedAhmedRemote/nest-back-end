import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UserProfile } from './entities/user-profile.entity';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private repository: Repository<UserProfile>,
  ) {}
  create(createUserProfileDto: CreateUserProfileDto) {
    return this.repository.save(createUserProfileDto);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, updateUserProfileDto: UpdateUserProfileDto) {
    await this.repository.update(id, updateUserProfileDto);
    return await this.repository.findOneBy({ id });
  }
}
