import { IProductItemRepository } from "../provider/IProductItemRepository";
import { NotFoundError } from "../../shared/errors/NotFoundError";

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

        if (!existingItem) {
            throw new NotFoundError("Item do produto não encontrado");
        }

        await this.productItemRepository.update(props.id, props.price, props.amount);
    }
}