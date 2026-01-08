import { IProductItemRepository } from "../provider/IProductItemRepository";
import { ProductItemValidationService } from "../service/ProductItemValidationService";

export class DeleteProductItemUseCase {
    constructor(
        private readonly productItemRepository: IProductItemRepository
    ) { }

    async execute(id: string): Promise<void> {
        const existingItem = await this.productItemRepository.findById(id);

        ProductItemValidationService.validateProductItemExists(existingItem);

        await this.productItemRepository.delete(id);
    }
}