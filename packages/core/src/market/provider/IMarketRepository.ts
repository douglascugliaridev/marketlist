import { Market } from "../model/market.entity";

export interface IMarketRepository {
    save(market: Market): Promise<void>;
    findByName(name: string): Promise<Market | null>;
    findById(id: string): Promise<Market | null>;
    findAll(): Promise<Market[]>;
    delete(id: string): Promise<Market | null>;
    update(id: string, name: string): Promise<void>;
}