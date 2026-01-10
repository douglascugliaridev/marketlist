import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { PrismaPurchaseRepository } from './prisma-purchase.repository';
import { PrismaService } from '../db/prisma.service';
import { UUIDAdapter } from '../shared/uuid.adapter';

@Module({
  controllers: [PurchaseController],
  providers: [PurchaseService, PrismaPurchaseRepository, PrismaService, UUIDAdapter],
})
export class PurchaseModule { }
