import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { PrismaUserRepository } from './auth/prisma-user.repository';
import { MarketModule } from './market/market.module';
import { ProductModule } from './product/product.module';
import { ProductItemModule } from './product-item/product-item.module';

@Module({
  imports: [AuthModule, DbModule, MarketModule, ProductModule, ProductItemModule],
  controllers: [AppController],
  providers: [AppService, PrismaUserRepository],
})
export class AppModule { }
