import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { PurchaseResponseDto } from './dto/purchase-response.dto';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) { }

  @Post()
  async create(@Body() createPurchaseDto: CreatePurchaseDto) {
    const purchase = await this.purchaseService.create(createPurchaseDto);
    return PurchaseResponseDto.fromPurchase(purchase);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const purchase = await this.purchaseService.findById(id);
    return PurchaseResponseDto.fromPurchase(purchase);
  }

  // @Get(':userId')
  // async findByUserId(@Param('userId') userId: string) {
  //   return await this.purchaseService.findByUserId(userId);
  // }

  // @Get(':marketId')
  // async findByMarketId(@Param('marketId') marketId: string) {
  //   return await this.purchaseService.findByMarketId(marketId);
  // }

  @Get()
  async findAll() {
    const purchases = await this.purchaseService.findAll();
    return PurchaseResponseDto.fromPurchases(purchases);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePurchaseDto: UpdatePurchaseDto) {
    const purchase = await this.purchaseService.update(id, updatePurchaseDto);
    return PurchaseResponseDto.fromPurchase(purchase);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.purchaseService.remove(id);
  }
}
