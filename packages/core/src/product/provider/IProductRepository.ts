import { Product } from "../model/product.entity";

export interface IProductRepository {
    save(product: Product): Promise<void>;
    findById(id: string): Promise<Product | null>;
    findByName(name: string): Promise<Product[]>;
    delete(id: string): Promise<Product | null>;
    findByListDefault(userId: string): Promise<Product[]>;
    findByBrand(brand: string): Promise<Product[]>;
}