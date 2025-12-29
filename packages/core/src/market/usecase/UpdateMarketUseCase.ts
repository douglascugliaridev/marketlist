import { IMarketRepository } from "../provider/IMarketRepository";
import { NotFoundError } from "../../shared/errors/NotFoundError";
import { ConflictError } from "../../shared/errors/ConflictError";

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

        if (!market) {
            throw new NotFoundError("Market not found");
        }

        // Verificar se já existe outro mercado com o mesmo nome
        const existingMarket = await this.marketRepository.findByName(marketProps.name);
        if (existingMarket && existingMarket.getId() !== marketProps.id) {
            throw new ConflictError("Já existe um supermercado com este nome");
        }

        // Atualizar o nome usando o método da entidade
        const updatedMarket = market.updateName(marketProps.name);

        await this.marketRepository.save(updatedMarket);
    }
}