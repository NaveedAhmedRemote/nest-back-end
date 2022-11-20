import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLaunchDto } from './dto/create-launch.dto';
import { UpdateLaunchDto } from './dto/update-launch.dto';
import { Launch } from './entities/launch.entity';

@Injectable()
export class LaunchService {
  constructor(
    @InjectRepository(Launch)
    private repository: Repository<Launch>,
  ) {}
  create(createLaunchDto: CreateLaunchDto) {
    return this.repository.save(createLaunchDto);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, updateLaunchDto: UpdateLaunchDto) {
    await this.repository.update(id, updateLaunchDto);
    return await this.repository.findOneBy({ id });
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
