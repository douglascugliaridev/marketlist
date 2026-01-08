import { IProductRepository } from "../provider/IProductRepository";
import { ProductValidationService } from "../service/ProductValidationService";

interface UpdateProductProps {
    id: string;
    name?: string;
    brand?: string;
    price?: number;
}

export class UpdateProductUseCase {
    constructor(private productRepository: IProductRepository) { }

    async execute(props: UpdateProductProps): Promise<void> {
        const product = await this.productRepository.findById(props.id);

        const validatedProduct = ProductValidationService.validateProductExists(product, 'id');

        let updatedProduct = validatedProduct;

        if (props.name !== undefined) {
            updatedProduct = updatedProduct.updateName(props.name);
        }
        if (props.brand !== undefined) {
            updatedProduct = updatedProduct.updateBrand(props.brand);
        }

        await this.productRepository.save(updatedProduct);
    }
}