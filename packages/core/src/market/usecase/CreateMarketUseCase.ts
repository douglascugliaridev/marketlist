import { IMarketRepository } from "../provider/IMarketRepository";
import { Market } from "../model/market.entity";
import { IUUIDProvider } from "../../shared/IUUIDProvider";
import { MarketValidationService } from "../service/MarketValidationService";

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
        const nomeNormalizado = marketProps.name.charAt(0).toUpperCase() + marketProps.name.slice(1).toLowerCase();

        const existingMarket = await this.marketRepository.findByName(nomeNormalizado);

        MarketValidationService.validateUniqueMarket(existingMarket, marketProps.name);

        const market = Market.create({
            id: this.uuidProvider.generate(),
            name: marketProps.name,
            userId: marketProps.userId
        });

        await this.marketRepository.save(market);

        return { marketId: market.getId() };
    }
}