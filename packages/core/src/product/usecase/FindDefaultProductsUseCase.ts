import { IProductRepository } from "../provider/IProductRepository";
import { Product } from "../model/product.entity";
import { ProductValidationService } from "../service/ProductValidationService";

export class FindDefaultProductsUseCase {
    constructor(
        private readonly productRepository: IProductRepository
    ) { }

    async execute(userId: string): Promise<Product[]> {
        ProductValidationService.validateUserIdFormat(userId);

        const products = await this.productRepository.findByListDefault(userId);

        return products;
    }
}
