import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductItemService } from './product-item.service';
import { CreateProductItemDto } from './dto/create-product-item.dto';
import { UpdateProductItemDto } from './dto/update-product-item.dto';

@Controller('product-item')
export class ProductItemController {
  constructor(private readonly productItemService: ProductItemService) { }

  @Post()
  async create(@Body() createProductItemDto: CreateProductItemDto) {
    return await this.productItemService.create(createProductItemDto);
  }

  @Get('purchase/:purchaseId')
  async findByPurchaseId(@Param('purchaseId') purchaseId: string) {
    return await this.productItemService.findByPurchaseId(purchaseId);
  }

  @Get('product/:productId')
  async findByProductId(@Param('productId') productId: string) {
    return await this.productItemService.findByProductId(productId);
  }

  @Get('purchase/:purchaseId/product/:productId')
  async findByPurchaseAndProduct(@Param('purchaseId') purchaseId: string, @Param('productId') productId: string) {
    return await this.productItemService.findByPurchaseAndProduct(purchaseId, productId);
  }

  @Delete('purchase/:purchaseId/product/:productId')
  async deleteByPurchaseAndProduct(@Param('purchaseId') purchaseId: string, @Param('productId') productId: string) {
    return await this.productItemService.deleteByPurchaseAndProduct(purchaseId, productId);
  }

  @Patch('purchase/:purchaseId/product/:productId')
  async updateByPurchaseAndProduct(@Param('purchaseId') purchaseId: string, @Param('productId') productId: string, @Body() updateProductItemDto: UpdateProductItemDto) {
    return await this.productItemService.updateByPurchaseAndProduct(purchaseId, productId, updateProductItemDto);
  }

}
