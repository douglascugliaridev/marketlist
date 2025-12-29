import { Injectable } from '@nestjs/common';
import { IUserPasswordRepository } from '@marketlist/core';
import { PrismaService } from '../db/prisma.service';

@Injectable()
export class PrismaUserPasswordRepository implements IUserPasswordRepository {
    constructor(private readonly prisma: PrismaService) { }

    async save(userPassword: any): Promise<void> {
        const userId = typeof userPassword.getUserId === 'function'
            ? userPassword.getUserId()
            : userPassword.userId;

        const passwordHash = typeof userPassword.getPasswordHash === 'function'
            ? userPassword.getPasswordHash()
            : userPassword.passwordHash || userPassword.password;

        await this.prisma.userPassword.upsert({
            where: { userId },
            update: {
                password: passwordHash,
            },
            create: {
                userId,
                password: passwordHash,
            },
        });
    }

    async findByUserId(userId: string): Promise<any | null> {
        const userPasswordData = await this.prisma.userPassword.findUnique({
            where: { userId },
        });

        if (!userPasswordData) {
            return null;
        }

        return {
            userId: userPasswordData.userId,
            passwordHash: userPasswordData.password,
        };
    }
}
