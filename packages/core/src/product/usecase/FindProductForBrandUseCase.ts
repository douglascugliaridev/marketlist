import { IProductRepository } from "../provider/IProductRepository";
import { ProductValidationService } from "../service/ProductValidationService";

export class FindProductForBrandUseCase {
    constructor(private readonly productRepository: IProductRepository) { }

    async execute(brand: string) {
        ProductValidationService.validateProductBrandFormat(brand);

        return this.productRepository.findByBrand(brand);
    }
}