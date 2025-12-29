import { Injectable } from '@nestjs/common';
import { IUserRepository, User } from '@marketlist/core';
import { PrismaService } from '../db/prisma.service';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) { }

  async save(user: User): Promise<void> {
    const passwordHash = user.getPasswordHash();

    const userUpsert = this.prisma.user.upsert({
      where: { id: user.getId() },
      update: {
        name: user.getName(),
        email: user.getEmail(),
      },
      create: {
        id: user.getId(),
        name: user.getName(),
        email: user.getEmail(),
      },
    });

    if (passwordHash) {
      await this.prisma.$transaction([
        userUpsert,
        this.prisma.userPassword.upsert({
          where: { userId: user.getId() },
          update: { password: passwordHash },
          create: { userId: user.getId(), password: passwordHash },
        }),
      ]);
    } else {
      await userUpsert;
    }
  }

  async findById(id: string): Promise<User | null> {
    const userData = await this.prisma.user.findUnique({
      where: { id },
      include: { password: true },
    });

    if (!userData) {
      return null;
    }

    return User.reconstitute({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      passwordHash: userData.password?.password,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const userData = await this.prisma.user.findUnique({
      where: { email },
      include: { password: true },
    });

    if (!userData) {
      return null;
    }

    return User.reconstitute({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      passwordHash: userData.password?.password,
    });
  }
}
