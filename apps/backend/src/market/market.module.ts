import { Module } from '@nestjs/common';
import { MarketService } from './market.service';
import { MarketController } from './market.controller';
import { PrismaMarketRepository } from './prisma-market.repository';
import { UUIDAdapter } from '../shared/uuid.adapter';
import { DbModule } from '../db/db.module';
import { PrismaService } from '../db/prisma.service';

@Module({
  imports: [DbModule],
  controllers: [MarketController],
  providers: [MarketService, PrismaMarketRepository, UUIDAdapter, PrismaService],
})
export class MarketModule { }
