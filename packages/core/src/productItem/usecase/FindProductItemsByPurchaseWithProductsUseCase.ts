import { IProductItemRepository } from "../provider/IProductItemRepository";
import { ProductItem } from "../model/product-item.entity";
import { ProductItemValidationService } from "../service/ProductItemValidationService";

interface FindItemsByPurchaseProps {
    purchaseId: string;
}

export class FindProductItemsByPurchaseWithProductsUseCase {
    constructor(
        private readonly productItemRepository: IProductItemRepository
    ) { }

    async execute(props: FindItemsByPurchaseProps): Promise<{ productItems: ProductItem[], products: any[] }> {
        ProductItemValidationService.validateProductItemPurchaseIdFormat(props.purchaseId);
        const result = await this.productItemRepository.findByPurchaseIdWithProducts(props.purchaseId);

        ProductItemValidationService.validateProductItemsExist(result.productItems);

        return result || { productItems: [], products: [] };
    }
}
