import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaProductRepository } from './prisma-product.repository';
import { UUIDAdapter } from '../shared/uuid.adapter';
import { PrismaService } from '../db/prisma.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaProductRepository, UUIDAdapter, PrismaService],
})
export class ProductModule { }
