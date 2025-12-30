import { Purchase } from "../model/purchase.entity";

export interface IPurchaseRepository {
    save(purchase: Purchase): Promise<void>;
    findById(id: string): Promise<Purchase | null>;
    findByUserId(userId: string): Promise<Purchase[]>;
    findByMarketId(marketId: string): Promise<Purchase[]>;
    findAll(): Promise<Purchase[]>;
    delete(id: string): Promise<Purchase | null>;
    update(id: string, name?: string | null): Promise<void>;
}
