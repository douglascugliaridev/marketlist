import { IProductItemRepository } from "../provider/IProductItemRepository";
import { ProductItemValidationService } from "../service/ProductItemValidationService";

export class DeleteProductItemUseCase {
    constructor(
        private readonly productItemRepository: IProductItemRepository
    ) { }

    async execute(productId: string, purchaseId: string): Promise<void> {
        const existingItem = await this.productItemRepository.findByPurchaseAndProduct(purchaseId, productId);

        ProductItemValidationService.validateProductItemExists(existingItem);

        await this.productItemRepository.delete(productId, purchaseId);
    }
}