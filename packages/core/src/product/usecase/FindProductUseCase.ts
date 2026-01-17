import { IProductRepository } from "../provider/IProductRepository";
import { ProductValidationService } from "../service/ProductValidationService";
import { Product } from "../model/product.entity";

interface ProductProps {
    id?: string;
    name?: string;
}

export class FindProductUseCase {
    constructor(private productRepository: IProductRepository) { }

    async execute(productProps: ProductProps): Promise<Product | Product[]> {
        ProductValidationService.validateSearchCriteria(productProps.id, productProps.name);

        if (productProps.id) {
            // Busca por ID retorna um único produto
            const product = await this.productRepository.findById(productProps.id);
            return ProductValidationService.validateProductExists(product, 'id');
        } else {
            // Busca por nome retorna um array de produtos
            const products = await this.productRepository.findByName(productProps.name!);
            return ProductValidationService.validateProductsExists(products, 'name');
        }
    }
}