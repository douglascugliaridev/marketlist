import { IPurchaseRepository, Purchase } from "@marketlist/core";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../db/prisma.service";

@Injectable()
export class PrismaPurchaseRepository implements IPurchaseRepository {
    constructor(private readonly prisma: PrismaService) { }

    async save(purchase: Purchase): Promise<void> {
        await this.prisma.purchase.upsert({
            where: {
                id: purchase.getId()
            },
            create: {
                id: purchase.getId(),
                name: purchase.getName(),
                userId: purchase.getUserId(),
                marketId: purchase.getMarketId()
            },
            update: {
                name: purchase.getName(),
                userId: purchase.getUserId(),
                marketId: purchase.getMarketId()
            }
        })
    }
    async findById(id: string): Promise<Purchase | null> {
        const purchase = await this.prisma.purchase.findUnique({ where: { id } })
        if (!purchase) {
            return null
        }
        return Purchase.create({
            id: purchase.id,
            name: purchase.name,
            userId: purchase.userId,
            marketId: purchase.marketId
        })
    }
    async findByUserId(userId: string): Promise<Purchase[]> {
        const purchases = await this.prisma.purchase.findMany({ where: { userId } })
        if (!purchases) {
            return []
        }
        return purchases.map(purchase => Purchase.create({
            id: purchase.id,
            name: purchase.name,
            userId: purchase.userId,
            marketId: purchase.marketId
        }))
    }
    async findByMarketId(marketId: string): Promise<Purchase[]> {
        const purchases = await this.prisma.purchase.findMany({ where: { marketId } })
        if (!purchases) {
            return []
        }
        return purchases.map(purchase => Purchase.create({
            id: purchase.id,
            name: purchase.name,
            userId: purchase.userId,
            marketId: purchase.marketId
        }))
    }
    async findAll(): Promise<Purchase[]> {
        const purchases = await this.prisma.purchase.findMany()
        if (!purchases) {
            return []
        }
        return purchases.map(purchase => Purchase.create({
            id: purchase.id,
            name: purchase.name,
            userId: purchase.userId,
            marketId: purchase.marketId
        }))
    }
    async delete(id: string): Promise<Purchase | null> {
        const purchase = await this.prisma.purchase.delete({ where: { id } })
        if (!purchase) {
            return null
        }
        return Purchase.create({
            id: purchase.id,
            name: purchase.name,
            userId: purchase.userId,
            marketId: purchase.marketId
        })
    }
    async update(id: string, userId?: string | null, marketId?: string | null): Promise<void> {
        await this.prisma.purchase.update({
            where: {
                id
            },
            data: {
                userId: userId ? { set: userId } : undefined,
                marketId: marketId ? { set: marketId } : undefined
            }
        })
    }

}