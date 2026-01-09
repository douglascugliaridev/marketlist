import { ProductItem } from "../model/product-item.entity";

export interface IProductItemRepository {
    save(productItem: ProductItem): Promise<void>;
    findByPurchaseAndProduct(purchaseId: string, productId: string): Promise<ProductItem | null>;
    findByPurchaseId(purchaseId: string): Promise<ProductItem[]>;
    findByProductId(productId: string): Promise<ProductItem | null>;
    findAll(): Promise<ProductItem[]>;
    delete(productId: string, purchaseId: string): Promise<ProductItem | null>;
    deleteByPurchaseId(purchaseId: string): Promise<void>;
    update(productId: string, purchaseId: string, price?: number, amount?: number): Promise<void>;
    findLastPriceByProduct(productId: string): Promise<number | null>;
}
