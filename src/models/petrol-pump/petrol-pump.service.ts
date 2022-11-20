import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetrolPumpDto } from './dto/create-petrol-pump.dto';
import { UpdatePetrolPumpDto } from './dto/update-petrol-pump.dto';
import { PetrolPump } from './entities/petrol-pump.entity';

@Injectable()
export class PetrolPumpService {
  constructor(
    @InjectRepository(PetrolPump)
    private repository: Repository<PetrolPump>,
  ) {}
  create(createPetrolPumpDto: CreatePetrolPumpDto) {
    return this.repository.save(createPetrolPumpDto);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    // return this.repository.findOneBy({ id });
  }

  update(id: number, updatePetrolPumpDto: UpdatePetrolPumpDto) {
    return this.repository.update(id, updatePetrolPumpDto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
