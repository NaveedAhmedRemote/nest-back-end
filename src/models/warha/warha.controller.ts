import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { WarhaService } from './warha.service';
import { CreateWarhaDto } from './dto/create-warha.dto';
import { UpdateWarhaDto } from './dto/update-warha.dto';

@Controller('warha')
export class WarhaController {
  constructor(private readonly warhaService: WarhaService) {}

  @Post('/add-warha')
  create(@Body() createWarhaDto: CreateWarhaDto) {
    return this.warhaService.create(createWarhaDto);
  }

  @Get('/warhay')
  findAll() {
    return this.warhaService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.warhaService.findOne(+id);
  }

  @Put('/update-warha/:id')
  update(@Param('id') id: string, @Body() updateWarhaDto: UpdateWarhaDto) {
    return this.warhaService.update(+id, updateWarhaDto);
  }

  @Delete('/delete-warha/:id')
  remove(@Param('id') id: string) {
    return this.warhaService.remove(+id);
  }

  @Get('/test')
  test() {
    return 'Working'
  }
}
