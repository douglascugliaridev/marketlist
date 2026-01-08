import { IMarketRepository } from "../provider/IMarketRepository";
import { MarketValidationService } from "../service/MarketValidationService";

export class DeleteMarketUseCase {
    constructor(
        private readonly marketRepository: IMarketRepository
    ) { }

    async execute(id: string): Promise<void> {
        MarketValidationService.validateMarketId(id);

        const existingMarket = await this.marketRepository.findById(id);
        MarketValidationService.validateMarketExists(existingMarket, 'id');

        await this.marketRepository.delete(id);
    }
}