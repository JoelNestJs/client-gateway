import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Logger } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { ORDERS_SERVICE } from 'src/config';

@Controller('orders')
export class OrdersController {

  private readonly logger = new Logger('OrdersController');

  constructor(
    @Inject(ORDERS_SERVICE) private readonly ordersClient: ClientProxy,
  ) { }

  @Post()
  create(@Body() createOrderDto: any) {
    return this.ordersClient.send('createOrder', createOrderDto)
      .pipe(catchError(err => { throw new RpcException(err) }));
  }

  @Get()
  findAll() {
    return this.ordersClient.send('findAllOrders', {})
      .pipe(catchError(err => { throw new RpcException(err) }));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersClient.send('findOneOrder', { id })
      .pipe(catchError(err => { throw new RpcException(err) }));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: any) {
    return this.ordersClient.send('updateOrder', { id, ...updateOrderDto })
      .pipe(catchError(err => { throw new RpcException(err) }));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersClient.send('removeOrder', { id });
  }
}
