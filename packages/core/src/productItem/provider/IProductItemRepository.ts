import { ProductItem } from "../model/product-item.entity";

export interface IProductItemRepository {
    save(productItem: ProductItem): Promise<void>;
    findById(id: string): Promise<ProductItem | null>;
    findByPurchaseId(purchaseId: string): Promise<ProductItem[]>;
    findByProductId(productId: string): Promise<ProductItem[]>;
    findByPurchaseAndProduct(purchaseId: string, productId: string): Promise<ProductItem | null>;
    findAll(): Promise<ProductItem[]>;
    delete(id: string): Promise<ProductItem | null>;
    deleteByPurchaseId(purchaseId: string): Promise<void>;
    update(id: string, price?: number, amount?: number): Promise<void>;
    findLastPriceByProduct(productId: string): Promise<number | null>;
}
