import { IProductRepository } from "../provider/IProductRepository";
import { Product } from "../model/product.entity";

export class FindDefaultProductsUseCase {
    constructor(
        private readonly productRepository: IProductRepository
    ) { }

    async execute(userId: string): Promise<Product[]> {
        return await this.productRepository.findByListDefault(userId);
    }
}
