import { IProductRepository } from "../provider/IProductRepository";
import { ProductValidationService } from "../service/ProductValidationService";

export class DeleteProductUseCase {
    constructor(private productRepository: IProductRepository) { }

    async execute(id: string): Promise<void> {
        ProductValidationService.validateProductIdFormat(id);

        const product = await this.productRepository.findById(id);
        ProductValidationService.validateProductExists(product, 'id');

        await this.productRepository.delete(id);
    }
}