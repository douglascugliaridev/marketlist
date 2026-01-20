import { Module } from '@nestjs/common';
import { ProductItemService } from './product-item.service';
import { ProductItemController } from './product-item.controller';
import { PrismaProductItemRepository } from './prisma-productItem.repository';
import { PrismaProductRepository } from '../product/prisma-product.repository';
import { PrismaService } from '../db/prisma.service';
import { PrismaPurchaseRepository } from '../purchase/prisma-purchase.repository';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ProductItemController],
  providers: [ProductItemService, PrismaProductItemRepository, PrismaProductRepository, PrismaPurchaseRepository, PrismaService, JwtAuthGuard],
})
export class ProductItemModule { }
