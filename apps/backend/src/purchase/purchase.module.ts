import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { PrismaPurchaseRepository } from './prisma-purchase.repository';
import { PrismaService } from '../db/prisma.service';
import { UUIDAdapter } from '../shared/uuid.adapter';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [PurchaseController],
  providers: [PurchaseService, PrismaPurchaseRepository, PrismaService, UUIDAdapter, JwtAuthGuard],
})
export class PurchaseModule { }
