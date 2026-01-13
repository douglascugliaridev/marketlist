import { IProductRepository } from "../provider/IProductRepository";
import { Product } from "../model/product.entity";
import { IUUIDProvider } from "../../shared/IUUIDProvider";



interface ProductProps {
    id?: string;
    name: string;
    brand: string;
    listDefault?: boolean;
    userId: string;
}

export class CreateProductUseCase {
    constructor(
        private readonly productRepository: IProductRepository,
        private readonly uuidProvider: IUUIDProvider
    ) { }

    async execute(input: ProductProps): Promise<Product> {
        const product = Product.create({
            id: this.uuidProvider.generate(),
            name: input.name,
            brand: input.brand,
            listDefault: input.listDefault ?? false,
            userId: input.userId
        });

        await this.productRepository.save(product);

        return product;
    }
}