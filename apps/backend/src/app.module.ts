import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { PrismaUserRepository } from './auth/prisma-user.repository';
import { MarketModule } from './market/market.module';

@Module({
  imports: [AuthModule, DbModule, MarketModule],
  controllers: [AppController],
  providers: [AppService, PrismaUserRepository],
})
export class AppModule { }
