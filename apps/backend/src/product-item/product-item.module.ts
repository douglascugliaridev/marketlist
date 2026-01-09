import { Module } from '@nestjs/common';
import { ProductItemService } from './product-item.service';
import { ProductItemController } from './product-item.controller';
import { PrismaProductItemRepository } from './prisma-productItem.repository';
import { PrismaProductRepository } from '../product/prisma-product.repository';

@Module({
  controllers: [ProductItemController],
  providers: [ProductItemService, PrismaProductItemRepository, PrismaProductRepository],
})
export class ProductItemModule { }
