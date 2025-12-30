import { IProductItemRepository } from "../provider/IProductItemRepository";
import { NotFoundError } from "../../shared/errors/NotFoundError";

export class DeleteProductItemUseCase {
    constructor(
        private readonly productItemRepository: IProductItemRepository
    ) { }

    async execute(id: string): Promise<void> {
        const existingItem = await this.productItemRepository.findById(id);

        if (!existingItem) {
            throw new NotFoundError("Item do produto não encontrado");
        }

        await this.productItemRepository.delete(id);
    }
}