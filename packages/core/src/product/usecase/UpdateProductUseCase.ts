import { IProductRepository } from "../provider/IProductRepository";
import { ProductValidationService } from "../service/ProductValidationService";
import { ProductName } from "../model/value-objects/ProductName";
import { ProductBrand } from "../model/value-objects/ProductBrand";

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
        let finalName = validatedProduct.getName();
        let finalBrand = validatedProduct.getBrand();

        if (props.name !== undefined) {
            finalName = ProductName.create(props.name).getValue();
            updatedProduct = updatedProduct.updateName(props.name);
        }
        if (props.brand !== undefined) {
            finalBrand = ProductBrand.create(props.brand).getValue();
            updatedProduct = updatedProduct.updateBrand(props.brand);
        }

        // Verificar se já existe outro produto com o mesmo nome e marca
        if (props.name !== undefined || props.brand !== undefined) {
            const existingProducts = await this.productRepository.findByName(finalName);
            ProductValidationService.validateUniqueProductForUpdate(
                existingProducts,
                props.id,
                finalName,
                finalBrand
            );
        }

        await this.productRepository.save(updatedProduct);
    }
}