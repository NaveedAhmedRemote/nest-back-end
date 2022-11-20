import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { Truck } from './entities/truck.entity';

@Injectable()
export class TruckService {
  constructor(
    @InjectRepository(Truck)
    private repository: Repository<Truck>,
  ) {}
  create(createTruckDto: CreateTruckDto) {
    return this.repository.save(createTruckDto);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    // return this.repository.findOneBy(id);
  }

  update(id: number, updateTruckDto: UpdateTruckDto) {
    return this.repository.update(id, updateTruckDto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
