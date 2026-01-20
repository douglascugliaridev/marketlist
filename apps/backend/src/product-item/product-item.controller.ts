import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductItemService } from './product-item.service';
import { CreateProductItemDto } from './dto/create-product-item.dto';
import { UpdateProductItemDto } from './dto/update-product-item.dto';
import { ProductItemResponseDto } from './dto/productItem-response.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('product-item')
@UseGuards(JwtAuthGuard)
export class ProductItemController {
  constructor(private readonly productItemService: ProductItemService) { }

  @Post()
  async create(@Body() createProductItemDto: CreateProductItemDto) {
    const productItem = await this.productItemService.createProductItem(createProductItemDto);
    return ProductItemResponseDto.fromProductItem(productItem);
  }

  @Get('purchase/:purchaseId')
  async findProductItemsByPurchase(@Param('purchaseId') purchaseId: string) {
    const result = await this.productItemService.findProductItemsByPurchase(purchaseId);
    return ProductItemResponseDto.fromProductItems(result.productItems, result.products);
  }

  @Get()
  async findAll() {
    const productItems = await this.productItemService.findAllProductItems();
    return ProductItemResponseDto.fromProductItems(productItems);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductItemDto: UpdateProductItemDto) {
    updateProductItemDto.productId = id;
    const productItem = await this.productItemService.updateProductItem(updateProductItemDto);
    return ProductItemResponseDto.fromProductItem(productItem);
  }


  @Delete(':productId/:purchaseId')
  async remove(@Param('productId') productId: string, @Param('purchaseId') purchaseId: string) {
    await this.productItemService.removeProductItem(productId, purchaseId);
  }

}
