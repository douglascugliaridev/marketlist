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
    const productItem = await this.productItemService.createProductItem(createProductItemDto);
    return ProductItemResponseDto.fromProductItem(productItem);
  }

  @Get(':purchaseId')
  async findProductItemsByPurchase(@Param('purchaseId') purchaseId: string) {
    const productItems = await this.productItemService.findProductItemsByPurchase(purchaseId);
    return ProductItemResponseDto.fromProductItems(productItems);
  }

  @Get()
  async findAll() {
    const productItems = await this.productItemService.findAllProductItems();
    return ProductItemResponseDto.fromProductItems(productItems);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductItemDto: UpdateProductItemDto) {
    const productItem = await this.productItemService.updateProductItem(id, updateProductItemDto);
    return ProductItemResponseDto.fromProductItem(productItem);
  }


  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.productItemService.removeProductItem(id);
  }

}
