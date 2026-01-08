import { IProductItemRepository } from "../provider/IProductItemRepository";
import { ProductItemValidationService } from "../service/ProductItemValidationService";

interface UpdateProductItemProps {
    id: string;
    price?: number;
    amount?: number;
}

export class UpdateProductItemUseCase {
    constructor(
        private readonly productItemRepository: IProductItemRepository
    ) { }

    async execute(props: UpdateProductItemProps): Promise<void> {
        const existingItem = await this.productItemRepository.findById(props.id);

        ProductItemValidationService.validateProductItemExists(existingItem);

        await this.productItemRepository.update(props.id, props.price, props.amount);
    }
}