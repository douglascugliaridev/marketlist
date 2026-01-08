import { IMarketRepository } from "../provider/IMarketRepository";
import { Market } from "../model/market.entity";
import { MarketValidationService } from "../service/MarketValidationService";

interface MarketProps {
    id?: string;
    name?: string;
}

export class FindMarketUseCase {
    constructor(
        private readonly marketRepository: IMarketRepository
    ) { }

    async execute(marketProps: MarketProps): Promise<Market> {
        MarketValidationService.validateSearchCriteria(marketProps.id, marketProps.name);

        const market = marketProps.id
            ? await this.marketRepository.findById(marketProps.id)
            : await this.marketRepository.findByName(marketProps.name!);

        return MarketValidationService.validateMarketExists(
            market,
            marketProps.id ? 'id' : 'name'
        );
    }
}