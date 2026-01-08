import { IMarketRepository } from "../provider/IMarketRepository";
import { MarketValidationService } from "../service/MarketValidationService";

interface MarketProps {
    id: string;
    name: string;
}

export class UpdateMarketUseCase {
    constructor(
        private readonly marketRepository: IMarketRepository
    ) { }

    async execute(marketProps: MarketProps): Promise<void> {
        const market = await this.marketRepository.findById(marketProps.id);

        const validatedMarket = MarketValidationService.validateMarketExists(market, 'id');

        // Verificar se já existe outro mercado com o mesmo nome
        const existingMarket = await this.marketRepository.findByName(marketProps.name);
        MarketValidationService.validateUniqueMarketForUpdate(
            existingMarket,
            marketProps.id,
            marketProps.name
        );

        // Atualizar o nome usando o método da entidade
        const updatedMarket = validatedMarket.updateName(marketProps.name);

        await this.marketRepository.save(updatedMarket);
    }
}