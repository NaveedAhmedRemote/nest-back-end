import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFactoryDto } from './dto/create-factory.dto';
import { UpdateFactoryDto } from './dto/update-factory.dto';
import { Factory } from './entities/factory.entity';

@Injectable()
export class FactoryService {
  constructor(
    @InjectRepository(Factory)
    private repository: Repository<Factory>,
  ) {}
  async create(createFactoryDto: CreateFactoryDto) {
    return await this.repository.save(createFactoryDto);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, updateFactoryDto: UpdateFactoryDto) {
    await this.repository.update(id, updateFactoryDto);
    return await this.repository.findOneBy({ id });
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
