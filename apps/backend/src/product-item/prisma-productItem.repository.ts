import { Injectable } from "@nestjs/common";
import { IProductItemRepository, ProductItem } from "@marketlist/core";
import { PrismaService } from "../db/prisma.service";

@Injectable()
export class PrismaProductItemRepository implements IProductItemRepository {
    constructor(private readonly prisma: PrismaService) { }

    async save(productItem: ProductItem): Promise<void> {
        await this.prisma.productItem.upsert({
            where: {
                productId_purchaseId: {
                    productId: productItem.getProductId(),
                    purchaseId: productItem.getPurchaseId()
                }
            },
            create: {
                purchaseId: productItem.getPurchaseId(),
                productId: productItem.getProductId(),
                price: productItem.getPrice().getValue(),
                previousPrice: productItem.getPreviousPrice().getValue(),
                amount: productItem.getAmount().getValue()
            },
            update: {
                price: productItem.getPrice().getValue(),
                previousPrice: productItem.getPreviousPrice().getValue(),
                amount: productItem.getAmount().getValue()
            }
        })
    }
    async findByPurchaseAndProduct(purchaseId: string, productId: string): Promise<ProductItem | null> {
        const productItem = await this.prisma.productItem.findUnique({ where: { productId_purchaseId: { productId, purchaseId } } })
        if (!productItem) {
            return null
        }
        return ProductItem.create({
            productId: productItem.productId,
            purchaseId: productItem.purchaseId,
            price: productItem.price,
            previousPrice: productItem.previousPrice || 0,
            amount: Number(productItem.amount)
        })
    }
    async findByPurchaseId(purchaseId: string): Promise<ProductItem[]> {
        const productItems = await this.prisma.productItem.findMany({ where: { purchaseId } })
        if (!productItems) {
            return []
        }
        return productItems.map(productItem => ProductItem.create({
            productId: productItem.productId,
            purchaseId: productItem.purchaseId,
            price: productItem.price,
            previousPrice: productItem.previousPrice || 0,
            amount: Number(productItem.amount)
        }))
    }
    async findByProductId(productId: string): Promise<ProductItem | null> {
        const productItem = await this.prisma.productItem.findFirst({ where: { productId } })

        if (!productItem) {
            return null
        }
        return ProductItem.create({
            productId: productItem.productId,
            purchaseId: productItem.purchaseId,
            price: productItem.price,
            previousPrice: productItem.previousPrice || 0,
            amount: Number(productItem.amount)
        })
    }
    async findAll(): Promise<ProductItem[]> {
        const productItems = await this.prisma.productItem.findMany()
        if (!productItems) {
            return []
        }
        return productItems.map(productItem => ProductItem.create({
            productId: productItem.productId,
            purchaseId: productItem.purchaseId,
            price: productItem.price,
            previousPrice: productItem.previousPrice || 0,
            amount: Number(productItem.amount)
        }))
    }
    async delete(productId: string, purchaseId: string): Promise<ProductItem | null> {
        const productItem = await this.prisma.productItem.delete({
            where: { productId_purchaseId: { productId, purchaseId } }
        })
        if (!productItem) {
            return null
        }
        return ProductItem.create({
            productId: productItem.productId,
            purchaseId: productItem.purchaseId,
            price: productItem.price,
            previousPrice: productItem.previousPrice || 0,
            amount: Number(productItem.amount)
        })
    }
    async deleteByPurchaseId(purchaseId: string): Promise<void> {
        await this.prisma.productItem.deleteMany({ where: { purchaseId } })
    }
    async update(productId: string, purchaseId: string, price?: number, amount?: number): Promise<void> {
        await this.prisma.productItem.update({
            where: { productId_purchaseId: { productId, purchaseId } },
            data: { price, amount }
        })
    }
    async findLastPriceByProduct(productId: string): Promise<number | null> {
        const productItem = await this.prisma.productItem.findFirst({ where: { productId }, orderBy: { purchaseId: 'desc' } })
        if (!productItem) {
            return null
        }
        return productItem.price
    }

}