import { IProductRepository } from "../provider/IProductRepository";
import { ProductValidationService } from "../service/ProductValidationService";

export class FindProductsByNameUseCase {
    constructor(private productRepository: IProductRepository) { }

    async execute(name: string) {
        ProductValidationService.validateProductNameFormat(name);

        const products = await this.productRepository.findByName(name);

        return products;
    }
}
