import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('product')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.create(createProductDto);
    return ProductResponseDto.fromProduct(product);
  }

  @Get('default')
  async findDefault(@Query('userId') userId: string) {
    const products = await this.productService.findDefault(userId);
    return ProductResponseDto.fromProducts(products);
  }

  @Get('search')
  async findProduct(@Query('id') id?: string, @Query('name') name?: string) {
    if (id) {
      const product = await this.productService.findById(id);
      return ProductResponseDto.fromProduct(product);
    }

    if (name) {
      const products = await this.productService.findByName(name);
      return ProductResponseDto.fromProducts(products);
    }

    throw new Error('É necessário fornecer id ou name para busca');
  }

  @Get('brand')
  async findByBrand(@Query('brand') brand: string) {
    const products = await this.productService.findByBrand(brand);
    return ProductResponseDto.fromProducts(products);
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

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const product = await this.productService.update(id, updateProductDto);
    return product ? ProductResponseDto.fromProduct(product) : null;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.productService.remove(id);
  }
}
