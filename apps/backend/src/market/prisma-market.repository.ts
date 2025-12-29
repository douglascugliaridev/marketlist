import { Injectable } from '@nestjs/common';
import { PrismaService } from "../db/prisma.service";
import { IMarketRepository, Market } from "@marketlist/core";

@Injectable()
export class PrismaMarketRepository implements IMarketRepository {
    constructor(private readonly prisma: PrismaService) { }

    async save(market: Market): Promise<void> {
        await this.prisma.market.upsert({
            where: { id: market.getId() },
            update: {
                name: market.getName()
            },
            create: {
                id: market.getId(),
                name: market.getName(),
                user: {
                    connect: {
                        id: market.getUserId()
                    }
                }
            }
        })
    }
    async findAll(): Promise<Market[]> {
        const markets = await this.prisma.market.findMany();
        return markets.map(market => Market.create({
            id: market.id,
            name: market.name,
            userId: market.userId
        }))
    }

    async findByName(name: string): Promise<Market | null> {
        const market = await this.prisma.market.findFirst({ where: { name } })
        if (!market) {
            return null
        }
        return Market.create({
            id: market.id,
            name: market.name,
            userId: market.userId
        })
    }

    async delete(id: string): Promise<Market | null> {
        const market = await this.prisma.market.findUnique({ where: { id } })
        if (!market) {
            return null
        }
        await this.prisma.market.delete({ where: { id } })
        return Market.create({
            id: market.id,
            name: market.name,
            userId: market.userId
        })
    }

    async update(id: string, name: string): Promise<void> {
        await this.prisma.market.update({ where: { id }, data: { name } })
    }

    async findById(id: string): Promise<Market | null> {
        const market = await this.prisma.market.findUnique({ where: { id } })
        if (!market) {
            return null
        }
        return Market.create({
            id: market.id,
            name: market.name,
            userId: market.userId
        })
    }

}

