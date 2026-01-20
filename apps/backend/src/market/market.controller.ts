import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpCode, UseGuards } from '@nestjs/common';
import { MarketService } from './market.service';
import { CreateMarketDto } from './dto/create-market.dto';
import { UpdateMarketDto } from './dto/update-market.dto';
import { MarketResponseDto } from './dto/market-response.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('market')
@UseGuards(JwtAuthGuard)
export class MarketController {
  constructor(private readonly marketService: MarketService) { }

  @Post()
  async create(@Body() createMarketDto: CreateMarketDto) {
    const market = await this.marketService.create(createMarketDto);
    return MarketResponseDto.fromEntity(market);
  }

  @Get()
  async findAll() {
    const markets = await this.marketService.findAll();
    return MarketResponseDto.fromEntities(markets);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const market = await this.marketService.findById(id);
    return market ? MarketResponseDto.fromEntity(market) : null;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMarketDto: UpdateMarketDto, @Req() req: any) {
    const market = await this.marketService.update(id, updateMarketDto);
    return MarketResponseDto.fromEntity(market);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.marketService.delete(id);
  }
}
