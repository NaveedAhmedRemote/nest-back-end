import { Module } from '@nestjs/common';
import { PetrolPumpService } from './petrol-pump.service';
import { PetrolPumpController } from './petrol-pump.controller';
import { PetrolPump } from './entities/petrol-pump.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PetrolPump])],

  controllers: [PetrolPumpController],
  providers: [PetrolPumpService]
})
export class PetrolPumpModule {}
