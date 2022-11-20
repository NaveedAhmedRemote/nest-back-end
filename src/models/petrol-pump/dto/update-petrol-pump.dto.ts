import { PartialType } from '@nestjs/mapped-types';
import { CreatePetrolPumpDto } from './create-petrol-pump.dto';

export class UpdatePetrolPumpDto extends PartialType(CreatePetrolPumpDto) {}
