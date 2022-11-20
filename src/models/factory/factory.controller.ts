import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FactoryService } from './factory.service';
import { CreateFactoryDto } from './dto/create-factory.dto';
import { UpdateFactoryDto } from './dto/update-factory.dto';

@Controller('factory')
export class FactoryController {
  constructor(private readonly factoryService: FactoryService) {}

  @Post('/add-factory')
  create(@Body() createFactoryDto: CreateFactoryDto) {
    return this.factoryService.create(createFactoryDto);
  }

  @Get('/factories')
  findAll() {
    return this.factoryService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.factoryService.findOne(+id);
  }

  @Patch('/update-factory/:id')
  update(@Param('id') id: string, @Body() updateFactoryDto: UpdateFactoryDto) {
    return this.factoryService.update(+id, updateFactoryDto);
  }

  @Delete('/delete-factory/:id')
  remove(@Param('id') id: string) {
    return this.factoryService.remove(+id);
  }
}
