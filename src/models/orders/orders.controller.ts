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
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post('/add-order')
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }
  //
  @Get('/all-factory-orders')
  findAllOrdersOfFactory() {
    return this.ordersService.findAllOrdersOfFactorie();
  }

  @Get('/all-warha-orders')
  findAll() {
    return this.ordersService.getOrdersOfWarha();
  }
  @Get('/all-factory-orders')
  receivedBlockFromFactory() {
    return this.ordersService.receivedBlockFromFactory();
  }

  @Get('/all-launch-orders')
  getOrdersOfLaunches() {
    return this.ordersService.getOrdersOfLaunches();
  }
 
  @Get('/warha-orders/:id')
  findAllOrdersOfWarha(@Param('id') id: string) {
    return this.ordersService.findAllOrdersOfWarha(id);
  }

  @Get('/factory-orders/:id')
  findAllOrdersOfFactoryById(@Param('id') id: string) {
    return this.ordersService.findAllOrdersOfFactoryById(id);
  }
  @Get('/launch-orders/:id')
  findAllOrdersOfLaunch(@Param('id') id: string) {
    return this.ordersService.findAllOrdersOfLaunchById(id);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Put('update-order/:id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete('delete-order/:id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
