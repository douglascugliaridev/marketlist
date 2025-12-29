import { IMarketRepository } from "../provider/IMarketRepository";
import { NotFoundError } from "../../shared/errors/NotFoundError";
import { Market } from "../model/market.entity";
import { BadRequest } from "../../shared/errors/BadRequest";

interface MarketProps {
    id?: string;
    name?: string;
}

export class FindMarketUseCase {
    constructor(
        private readonly marketRepository: IMarketRepository
    ) { }

    async execute(marketProps: MarketProps): Promise<Market> {
        if (!marketProps.id && !marketProps.name) {
            throw new BadRequest("At least one search parameter (id or name) must be provided");
        }

        const market = marketProps.id
            ? await this.marketRepository.findById(marketProps.id)
            : await this.marketRepository.findByName(marketProps.name!);

        if (!market) {
            const searchType = marketProps.id ? "ID" : "name";
            throw new NotFoundError(`Market not found by ${searchType}`);
        }

        return market;
    }
}