import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @Get('default')
  async findDefault(@Query('userId') userId: string) {
    return await this.productService.findDefault(userId);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.productService.findById(id);
  }

  @Get()
  async findByUserId(@Query('userId') userId: string) {
    return await this.productService.findByUserId(userId);
  }

  @Get('search')
  async findByName(@Query('name') name: string) {
    return await this.productService.findByName(name);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return await this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productService.remove(id);
  }
}
