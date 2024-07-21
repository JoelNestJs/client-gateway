import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PRODUCTS_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {

  constructor(
    @Inject(PRODUCTS_SERVICE) private readonly productsClient: ClientProxy,
  ) { }

  @Post()
  create(@Body() body: any) {
    return this.productsClient.send({ cmd: 'create' }, body)
      .pipe(catchError(err => { throw new RpcException(err) }));
  }

  @Get()
  findAll(@Query() body: any) {
    return this.productsClient.send({ cmd: 'findAll' }, body)
      .pipe(catchError(err => { throw new RpcException(err) }));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsClient.send({ cmd: 'findOne' }, { id })
      .pipe(catchError(err => { throw new RpcException(err) }));
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.productsClient.send({ cmd: 'update' }, { id, ...body })
      .pipe(catchError(err => { throw new RpcException(err) }));
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsClient.send({ cmd: 'remove' }, { id })
      .pipe(catchError(err => { throw new RpcException(err) }));
  }
}
