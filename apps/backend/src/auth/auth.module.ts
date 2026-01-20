import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './jwt-auth.guard';
import { PrismaUserRepository } from './prisma-user.repository';
import { PrismaUserPasswordRepository } from './prisma-user-password.repository';
import { PasswordHasherAdapter } from './adapters/password-hasher.adapter';
import { UUIDAdapter } from '../shared/uuid.adapter';
import { DbModule } from '../db/db.module';

@Module({
  imports: [
    DbModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default-secret',
      signOptions: { expiresIn: '10m' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtAuthGuard,
    PrismaUserRepository,
    PrismaUserPasswordRepository,
    PasswordHasherAdapter,
    UUIDAdapter,
  ],
  exports: [AuthService, JwtAuthGuard, JwtModule],
})
export class AuthModule { }
