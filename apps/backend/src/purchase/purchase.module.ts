import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { PrismaPurchaseRepository } from './prisma-purchase.repository';

@Module({
  controllers: [PurchaseController],
  providers: [PurchaseService, PrismaPurchaseRepository],
})
export class PurchaseModule { }
