import { IMarketRepository } from "../provider/IMarketRepository";
import { Market } from "../model/market.entity";
import { IUUIDProvider } from "../../shared/IUUIDProvider";
import { ConflictError } from "../../shared/errors/ConflictError";

interface MarketProps {
    id?: string;
    name: string;
    userId: string;
}

export class CreateMarketUseCase {
    constructor(
        private readonly marketRepository: IMarketRepository,
        private readonly uuidProvider: IUUIDProvider
    ) { }

    async execute(marketProps: MarketProps): Promise<{ marketId: string }> {
        const existingMarket = await this.marketRepository.findByName(marketProps.name);

        if (existingMarket) {
            throw new ConflictError("Já existe um supermercado com este nome");
        }

        const market = Market.create({
            id: this.uuidProvider.generate(),
            name: marketProps.name,
            userId: marketProps.userId
        });

        await this.marketRepository.save(market);

        return { marketId: market.getId() };
    }
}