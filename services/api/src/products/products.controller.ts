import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CreateProductDto } from './create-product.dto';
import { ProductsService } from './products.service';

@Controller('stores/:storeId/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(
    @Param('storeId', ParseUUIDPipe) storeId: string,
    @Body() dto: CreateProductDto,
  ) {
    return this.productsService.create(storeId, dto);
  }

  @Get()
  findByStore(@Param('storeId', ParseUUIDPipe) storeId: string) {
    return this.productsService.findByStore(storeId);
  }
}