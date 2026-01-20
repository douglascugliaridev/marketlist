import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaProductRepository } from './prisma-product.repository';
import { UUIDAdapter } from '../shared/uuid.adapter';
import { PrismaService } from '../db/prisma.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ProductController],
  providers: [ProductService, PrismaProductRepository, UUIDAdapter, PrismaService, JwtAuthGuard],
})
export class ProductModule { }
