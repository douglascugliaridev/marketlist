import { IProductItemRepository } from "../provider/IProductItemRepository";

export class FindLastProductPriceUseCase {
    constructor(
        private readonly productItemRepository: IProductItemRepository
    ) { }

    async execute(productId: string): Promise<number | null> {
        return await this.productItemRepository.findLastPriceByProduct(productId);
    }
}
