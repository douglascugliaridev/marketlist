import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserUseCase, LoginUseCase } from '@marketlist/core';
import { PasswordHasherAdapter } from './adapters/password-hasher.adapter';
import { UUIDAdapter } from '../shared/uuid.adapter';
import { RegisterDto, LoginDto, AuthResponse } from './dto/auth.dto';
import { PrismaUserRepository } from './prisma-user.repository';

@Injectable()
export class AuthService {
  private readonly createUserUseCase: CreateUserUseCase;
  private readonly loginUseCase: LoginUseCase;

  constructor(
    private readonly userRepo: PrismaUserRepository,
    private readonly passwordHasher: PasswordHasherAdapter,
    private readonly uuidProvider: UUIDAdapter,
    private readonly jwtService: JwtService,
  ) {
    this.createUserUseCase = new CreateUserUseCase(
      this.userRepo,
      this.passwordHasher,
      this.uuidProvider
    );

    this.loginUseCase = new LoginUseCase(
      this.userRepo,
      this.passwordHasher,
    );
  }

  async register(registerDto: RegisterDto): Promise<{ userId: string }> {
    return this.createUserUseCase.execute(registerDto);
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const result = await this.loginUseCase.execute(loginDto);

    const payload = {
      sub: result.userId,
      email: result.email,
      name: result.name
    };

    const token = this.jwtService.sign(payload);

    return {
      ...result,
      token,
    };
  }
}
