import { IMarketRepository } from "../provider/IMarketRepository";
import { NotFoundError } from "../../shared/errors/NotFoundError";
import { BadRequest } from "../../shared/errors/BadRequest";

export class DeleteMarketUseCase {
    constructor(
        private readonly marketRepository: IMarketRepository
    ) { }

    async execute(id: string): Promise<void> {
        if (!id) {
            throw new BadRequest("Market ID is required");
        }

        const existingMarket = await this.marketRepository.findById(id);
        if (!existingMarket) {
            throw new NotFoundError("Market not found");
        }

        await this.marketRepository.delete(id);
    }
}