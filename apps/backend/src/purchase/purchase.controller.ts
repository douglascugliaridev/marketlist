import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) { }

  @Post()
  async create(@Body() createPurchaseDto: CreatePurchaseDto) {
    return await this.purchaseService.create(createPurchaseDto);
  }

  // @Get(':id')
  // async findById(@Param('id') id: string) {
  //   return await this.purchaseService.findById(id);
  // }

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
    return await this.purchaseService.findAll();
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePurchaseDto: UpdatePurchaseDto) {
    return await this.purchaseService.update(id, updatePurchaseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.purchaseService.remove(id);
  }
}
