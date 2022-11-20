import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entities/driver.entity';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private repository: Repository<Driver>,
  ) {}
  async create(createDriverDto: CreateDriverDto) {
    return await this.repository.save(createDriverDto);
  }
  async findAll() {
    return await this.repository.find();
  }
  async findOne(id: number) {
    return await this.repository.findOneBy({ id });
  }

  async update(id: number, updateDriverDto: UpdateDriverDto) {
    await this.repository.update(id, updateDriverDto);
    return await this.repository.findOneBy({ id });
  }
  async remove(id: number) {
    return await this.repository.delete(id);
  }
}
