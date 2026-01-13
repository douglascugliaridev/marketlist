import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductItemService } from './product-item.service';
import { CreateProductItemDto } from './dto/create-product-item.dto';
import { UpdateProductItemDto } from './dto/update-product-item.dto';
import { ProductItemResponseDto } from './dto/productItem-response.dto';

@Controller('product-item')
export class ProductItemController {
  constructor(private readonly productItemService: ProductItemService) { }

  @Post()
  async create(@Body() createProductItemDto: CreateProductItemDto) {
    const productItem = await this.productItemService.create(createProductItemDto);
    return ProductItemResponseDto.fromProductItem(productItem);
  }

  @Get('purchase/:purchaseId')
  async findByPurchaseId(@Param('purchaseId') purchaseId: string) {
    const productItems = await this.productItemService.findByPurchaseId(purchaseId);
    return ProductItemResponseDto.fromProductItems(productItems);
  }

  @Get('product/:productId')
  async findByProductId(@Param('productId') productId: string) {
    const productItem = await this.productItemService.findByProductId(productId);
    return ProductItemResponseDto.fromProductItem(productItem);
  }

  @Get('purchase/:purchaseId/product/:productId')
  async findByPurchaseAndProduct(@Param('purchaseId') purchaseId: string, @Param('productId') productId: string) {
    const productItem = await this.productItemService.findByPurchaseAndProduct(purchaseId, productId);
    return ProductItemResponseDto.fromProductItem(productItem);
  }

  @Delete('purchase/:purchaseId/product/:productId')
  async deleteByPurchaseAndProduct(@Param('purchaseId') purchaseId: string, @Param('productId') productId: string) {
    await this.productItemService.deleteByPurchaseAndProduct(purchaseId, productId);
  }

  @Patch('purchase/:purchaseId/product/:productId')
  async updateByPurchaseAndProduct(@Param('purchaseId') purchaseId: string, @Param('productId') productId: string, @Body() updateProductItemDto: UpdateProductItemDto) {
    const productItem = await this.productItemService.updateByPurchaseAndProduct(purchaseId, productId, updateProductItemDto);
    return ProductItemResponseDto.fromProductItem(productItem);
  }

}
