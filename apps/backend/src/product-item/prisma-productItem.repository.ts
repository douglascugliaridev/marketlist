import { Injectable } from "@nestjs/common";
import { IProductItemRepository, ProductItem } from "@marketlist/core";
import { PrismaService } from "../db/prisma.service";

@Injectable()
export class PrismaProductItemRepository implements IProductItemRepository {
    constructor(private readonly prisma: PrismaService) { }

    async save(productItem: ProductItem): Promise<void> {
        await this.prisma.productItem.upsert({
            where: { id: productItem.getId() },
            create: {
                id: productItem.getId(),
                purchaseId: productItem.getPurchaseId(),
                productId: productItem.getProductId(),
                price: productItem.getPrice(),
                amount: productItem.getAmount()
            },
            update: {
                purchaseId: productItem.getPurchaseId(),
                productId: productItem.getProductId(),
                price: productItem.getPrice(),
                amount: productItem.getAmount()
            }
        })
    }
    async findById(id: string): Promise<ProductItem | null> {
        const productItem = await this.prisma.productItem.findUnique({ where: { id } })
        if (!productItem) {
            return null
        }
        return ProductItem.create({
            id: productItem.id,
            purchaseId: productItem.purchaseId,
            productId: productItem.productId,
            price: productItem.price,
            amount: productItem.amount
        })
    }
    async findByPurchaseId(purchaseId: string): Promise<ProductItem[]> {
        const productItems = await this.prisma.productItem.findMany({ where: { purchaseId } })
        if (!productItems) {
            return []
        }
        return productItems.map(productItem => ProductItem.create({
            id: productItem.id,
            purchaseId: productItem.purchaseId,
            productId: productItem.productId,
            price: productItem.price,
            amount: productItem.amount
        }))
    }
    async findByProductId(productId: string): Promise<ProductItem[]> {
        const productItems = await this.prisma.productItem.findMany({ where: { productId } })
        if (!productItems) {
            return []
        }
        return productItems.map(productItem => ProductItem.create({
            id: productItem.id,
            purchaseId: productItem.purchaseId,
            productId: productItem.productId,
            price: productItem.price,
            amount: productItem.amount
        }))
    }
    async findByPurchaseAndProduct(purchaseId: string, productId: string): Promise<ProductItem | null> {
        const productItem = await this.prisma.productItem.findUnique({ where: { purchaseId_productId: { purchaseId, productId } } })
        if (!productItem) {
            return null
        }
        return ProductItem.create({
            id: productItem.id,
            purchaseId: productItem.purchaseId,
            productId: productItem.productId,
            price: productItem.price,
            amount: productItem.amount
        })
    }
    async findAll(): Promise<ProductItem[]> {
        const productItems = await this.prisma.productItem.findMany()
        if (!productItems) {
            return []
        }
        return productItems.map(productItem => ProductItem.create({
            id: productItem.id,
            purchaseId: productItem.purchaseId,
            productId: productItem.productId,
            price: productItem.price,
            amount: productItem.amount
        }))
    }
    async delete(id: string): Promise<ProductItem | null> {
        const productItem = await this.prisma.productItem.delete({ where: { id } })
        if (!productItem) {
            return null
        }
        return ProductItem.create({
            id: productItem.id,
            purchaseId: productItem.purchaseId,
            productId: productItem.productId,
            price: productItem.price,
            amount: productItem.amount
        })
    }
    async deleteByPurchaseId(purchaseId: string): Promise<void> {
        await this.prisma.productItem.deleteMany({ where: { purchaseId } })
    }
    async update(id: string, price?: number, amount?: number): Promise<void> {
        await this.prisma.productItem.update({ where: { id }, data: { price, amount } })
    }
    async findLastPriceByProduct(productId: string): Promise<number | null> {
        const productItem = await this.prisma.productItem.findFirst({ where: { productId }, orderBy: { createdAt: 'desc' } })
        if (!productItem) {
            return null
        }
        return productItem.price
    }

}