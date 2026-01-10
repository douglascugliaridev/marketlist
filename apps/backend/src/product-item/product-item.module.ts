import { Module } from '@nestjs/common';
import { ProductItemService } from './product-item.service';
import { ProductItemController } from './product-item.controller';
import { PrismaProductItemRepository } from './prisma-productItem.repository';
import { PrismaProductRepository } from '../product/prisma-product.repository';
import { PrismaService } from '../db/prisma.service';

@Module({
  controllers: [ProductItemController],
  providers: [ProductItemService, PrismaProductItemRepository, PrismaProductRepository, PrismaService],
})
export class ProductItemModule { }
