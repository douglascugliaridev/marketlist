import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { PrismaUserRepository } from './auth/prisma-user.repository';
import { MarketModule } from './market/market.module';
import { ProductModule } from './product/product.module';
import { ProductItemModule } from './product-item/product-item.module';
import { PurchaseModule } from './purchase/purchase.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [AuthModule, DbModule, MarketModule, ProductModule, ProductItemModule, PurchaseModule],
  controllers: [AppController],
  providers: [AppService, PrismaUserRepository, JwtAuthGuard],
})
export class AppModule { }
