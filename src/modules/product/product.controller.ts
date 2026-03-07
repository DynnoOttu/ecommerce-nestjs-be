import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductByIdDto } from './dto/get-product-by-id.dto';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { GetProductsDto } from './dto/get-products-dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @AllowAnonymous()
  @Get()
  async findAll(@Query() query: GetProductsDto) {
    return await this.productService.findAll(query);
  }

  @Get()
  @AllowAnonymous()
  async findOne(@Query() query: GetProductByIdDto) {
    return await this.productService.findOne(query.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
