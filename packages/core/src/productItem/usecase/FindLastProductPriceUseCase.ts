import { IProductItemRepository } from "../provider/IProductItemRepository";
import { ProductValidationService } from "../../product/service/ProductValidationService";

export class FindLastProductPriceUseCase {
    constructor(
        private readonly productItemRepository: IProductItemRepository
    ) { }

    async execute(productId: string): Promise<number | null> {
        ProductValidationService.validateProductIdFormat(productId);
        return await this.productItemRepository.findLastPriceByProduct(productId);
    }
}
