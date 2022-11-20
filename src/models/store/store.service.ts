import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './entities/store.entity';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private repository: Repository<Store>,
  ) {}
  create(createStoreDto: CreateStoreDto) {
    return this.repository.save(createStoreDto);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    // return this.repository.findOneBy({ id });
  }

  async update(id: number, updateStoreDto: UpdateStoreDto) {
    await this.repository.update(id, updateStoreDto);
    return await this.repository.findOneBy({ id });
  }

  remove(id: number) {
    return `This action removes a #${id} store`;
  }
}
