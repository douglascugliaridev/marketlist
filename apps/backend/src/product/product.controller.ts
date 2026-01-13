import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.create(createProductDto);
    return ProductResponseDto.fromProduct(product);
  }

  @Get('default')
  async findDefault(@Query('userId') userId: string) {
    const product = await this.productService.findDefault(userId);
    return ProductResponseDto.fromProduct(product);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const product = await this.productService.findById(id);
    return ProductResponseDto.fromProduct(product);
  }

  @Get()
  async findByUserId(@Query('userId') userId: string) {
    const products = await this.productService.findByUserId(userId);
    return ProductResponseDto.fromProducts(products);
  }

  @Get('search')
  async findByName(@Query('name') name: string) {
    const products = await this.productService.findByName(name);
    return ProductResponseDto.fromProducts(products);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const product = await this.productService.update(id, updateProductDto);
    return ProductResponseDto.fromProduct(product);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.productService.remove(id);
  }
}
