import { IProductRepository } from "../provider/IProductRepository";
import { ProductValidationService } from "../service/ProductValidationService";

interface ProductProps {
    id?: string;
    name?: string;
}

export class FindProductUseCase {
    constructor(private productRepository: IProductRepository) { }

    async execute(productProps: ProductProps) {
        ProductValidationService.validateSearchCriteria(productProps.id, productProps.name);

        const product = productProps.id
            ? await this.productRepository.findById(productProps.id)
            : await this.productRepository.findByName(productProps.name!);

        return ProductValidationService.validateProductExists(
            product,
            productProps.id ? 'id' : 'name'
        );
    }
}