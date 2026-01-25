import { IProductRepository, Product, IPaginationParams } from "@marketlist/core";
import { PrismaService } from "../db/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaProductRepository implements IProductRepository {
    constructor(private readonly prisma: PrismaService) { }

    async save(product: Product): Promise<void> {
        await this.prisma.product.upsert({
            where: { id: product.getId() },
            create: {
                id: product.getId(),
                name: product.getName(),
                userId: product.getUserId(),
                brand: product.getBrand(),
                listDefault: product.isListDefault()
            },
            update: {
                name: product.getName(),
                userId: product.getUserId(),
                brand: product.getBrand(),
                listDefault: product.isListDefault()
            }
        })
    }

    async findById(id: string): Promise<Product | null> {
        const product = await this.prisma.product.findUnique({ where: { id } })
        if (!product) {
            return null
        }
        return Product.create({
            id: product.id,
            name: product.name,
            userId: product.userId,
            brand: product.brand,
            listDefault: product.listDefault
        })
    }

    async findByName(name: string): Promise<Product[]> {
        const products = await this.prisma.product.findMany({
            where: {
                name: {
                    contains: name,
                    mode: 'insensitive'
                }
            }
        })
        if (!products) {
            return []
        }

        return products.map(product => Product.create({
            id: product.id,
            name: product.name,
            userId: product.userId,
            brand: product.brand,
            listDefault: product.listDefault
        }))
    }

    async delete(id: string): Promise<Product | null> {
        const product = await this.prisma.product.findUnique({ where: { id } })
        if (!product) {
            return null
        }
        await this.prisma.product.delete({ where: { id } })

        return Product.create({
            id: product.id,
            name: product.name,
            userId: product.userId,
            brand: product.brand,
            listDefault: product.listDefault
        })
    }

    async findByListDefault(userId: string): Promise<Product[]> {
        const products = await this.prisma.product.findMany({ where: { userId, listDefault: true } })
        return products.map(product => Product.create({
            id: product.id,
            name: product.name,
            userId: product.userId,
            brand: product.brand,
            listDefault: product.listDefault
        }))
    }

    async findByUserId(userId: string, pagination?: IPaginationParams): Promise<Product[]> {
        const skip = pagination?.page && pagination?.limit ? (pagination.page - 1) * pagination.limit : undefined;
        const take = pagination?.limit || undefined;

        const products = await this.prisma.product.findMany({
            where: { userId },
            skip,
            take
        })
        return products.map(product => Product.create({
            id: product.id,
            name: product.name,
            userId: product.userId,
            brand: product.brand,
            listDefault: product.listDefault
        }))
    }

    async countByUserId(userId: string): Promise<number> {
        return await this.prisma.product.count({
            where: { userId }
        });
    }

    async findByBrand(brand: string): Promise<Product[]> {
        const products = await this.prisma.product.findMany({
            where: {
                brand: {
                    contains: brand,
                    mode: 'insensitive'
                }
            }
        })
        return products.map(product => Product.create({
            id: product.id,
            name: product.name,
            userId: product.userId,
            brand: product.brand,
            listDefault: product.listDefault
        }))
    }

}