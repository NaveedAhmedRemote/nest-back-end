import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TruckService } from './truck.service';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';

@Controller('truck')
export class TruckController {
  constructor(private readonly truckService: TruckService) {}

  @Post('/add-truck')
  create(@Body() createTruckDto: CreateTruckDto) {
    return this.truckService.create(createTruckDto);
  }

  @Get('/trucks')
  findAll() {
    return this.truckService.findAll();
  }

  @Get('/truck/:id')
  findOne(@Param('id') id: string) {
    return this.truckService.findOne(+id);
  }

  @Put('update-truck/:id')
  update(@Param('id') id: string, @Body() updateTruckDto: UpdateTruckDto) {
    return this.truckService.update(+id, updateTruckDto);
  }

  @Delete('delete-truck/:id')
  remove(@Param('id') id: string) {
    return this.truckService.remove(+id);
  }
}
