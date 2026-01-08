import { IProductRepository } from "../provider/IProductRepository";

export class DeleteProductUseCase {
    constructor(private productRepository: IProductRepository) { }

    async execute(id: string): Promise<void> {
        await this.productRepository.delete(id);
    }
}