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
import { LaunchService } from './launch.service';
import { CreateLaunchDto } from './dto/create-launch.dto';
import { UpdateLaunchDto } from './dto/update-launch.dto';

@Controller('launch')
export class LaunchController {
  constructor(private readonly launchService: LaunchService) {}

  @Post('/add-launch')
  create(@Body() createLaunchDto: CreateLaunchDto) {
    return this.launchService.create(createLaunchDto);
  }

  @Get('/all-launches')
  findAll() {
    return this.launchService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.launchService.findOne(+id);
  }

  @Put('update-launch/:id')
  update(@Param('id') id: string, @Body() updateLaunchDto: UpdateLaunchDto) {
    return this.launchService.update(+id, updateLaunchDto);
  }

  @Delete('/delete-launch/:id')
  remove(@Param('id') id: string) {
    return this.launchService.remove(+id);
  }
}
