import { Product } from "../model/product.entity";
import { IPaginationParams } from "../../shared/IPagination";

export interface IProductRepository {
    save(product: Product): Promise<void>;
    findById(id: string): Promise<Product | null>;
    findByName(name: string): Promise<Product[]>;
    delete(id: string): Promise<Product | null>;
    findByListDefault(userId: string): Promise<Product[]>;
    findByUserId(userId: string, pagination?: IPaginationParams): Promise<Product[]>;
    countByUserId(userId: string): Promise<number>;
    findByBrand(brand: string): Promise<Product[]>;
}