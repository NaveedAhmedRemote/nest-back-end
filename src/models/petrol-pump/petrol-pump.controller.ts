import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PetrolPumpService } from './petrol-pump.service';
import { CreatePetrolPumpDto } from './dto/create-petrol-pump.dto';
import { UpdatePetrolPumpDto } from './dto/update-petrol-pump.dto';

@Controller('petrol-pump')
export class PetrolPumpController {
  constructor(private readonly petrolPumpService: PetrolPumpService) {}

  @Post('/add-pump')
  create(@Body() createPetrolPumpDto: CreatePetrolPumpDto) {
    return this.petrolPumpService.create(createPetrolPumpDto);
  }

  @Get('/petrol-pumps')
  findAll() {
    return this.petrolPumpService.findAll();
  }

  @Get('/petrol-pump/:id')
  findOne(@Param('id') id: string) {
    return this.petrolPumpService.findOne(+id);
  }

  @Patch('/update-petrol-pump:id')
  update(
    @Param('id') id: string,
    @Body() updatePetrolPumpDto: UpdatePetrolPumpDto,
  ) {
    return this.petrolPumpService.update(+id, updatePetrolPumpDto);
  }

  @Delete('/delete-petrol-pump/:id')
  remove(@Param('id') id: string) {
    return this.petrolPumpService.remove(+id);
  }
}
