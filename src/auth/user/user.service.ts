import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CONSTANTS } from 'src/Constants';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}
  public users = [
    {
      username: 'User 1',
      password: 'Admin',
      email: 'user1@',
      role: CONSTANTS.ROLE.Admin,
    },
    {
      username: 'User2',
      password: 'Admin',
      email: 'user2@gmail.com',
      role: CONSTANTS.ROLE.Teller,
    },
    {
      username: 'User3',
      password: 'Admin',
      email: 'usere@gmail.com',
      role: CONSTANTS.ROLE.Teller,
    },
  ];
  async getUserByUsername(username: string, password: string) {
    const user =  await this.repository.findOneBy({
      username: username,
      password: password,
    });
    console.log("getUserByUsername In UserService",user)
    return user
  }
  create(createUserDto: CreateUserDto) {
    return this.repository.save(createUserDto);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    return await this.repository.findOne({
      where: { id: id },
      relations: { profiles: true, stores: true },
    });
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.repository.update(id, updateUserDto);
    return await this.repository.findOneBy({ id });
  }

  async remove(id: number) {
    return await this.repository.delete(id);
  }
}
