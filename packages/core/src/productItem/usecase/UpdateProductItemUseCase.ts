import { IProductItemRepository } from "../provider/IProductItemRepository";
import { ProductItemValidationService } from "../service/ProductItemValidationService";

interface UpdateProductItemProps {
    productId: string;
    purchaseId: string;
    price?: number;
    amount?: number;
}

export class UpdateProductItemUseCase {
    constructor(
        private readonly productItemRepository: IProductItemRepository
    ) { }

    async execute(props: UpdateProductItemProps): Promise<void> {
        ProductItemValidationService.validateProductItemPurchaseIdFormat(props.purchaseId);

        const existingItem = await this.productItemRepository.findByPurchaseAndProduct(props.purchaseId, props.productId);

        ProductItemValidationService.validateProductItemExists(existingItem);

        if (props.price !== undefined) {
            ProductItemValidationService.validateProductItemPrice(props.price);
        }

        if (props.amount !== undefined) {
            ProductItemValidationService.validateProductItemAmount(props.amount);
        }

        await this.productItemRepository.update(props.productId, props.purchaseId, props.price, props.amount);
    }
}