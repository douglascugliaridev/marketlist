import { IProductItemRepository } from "../provider/IProductItemRepository";
import { ProductItem } from "../model/product-item.entity";
import { ProductItemValidationService } from "../service/ProductItemValidationService";

interface FindItemsByPurchaseProps {
    purchaseId: string;
}

export class FindProductItemsByPurchaseUseCase {
    constructor(
        private readonly productItemRepository: IProductItemRepository
    ) { }

    async execute(props: FindItemsByPurchaseProps): Promise<ProductItem[]> {
        const items = await this.productItemRepository.findByPurchaseId(props.purchaseId);

        ProductItemValidationService.validateProductItemsExist(items);

        return items || [];
    }
}