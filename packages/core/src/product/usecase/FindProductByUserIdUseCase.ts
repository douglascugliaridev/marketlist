import { IProductRepository } from "../provider/IProductRepository";

export class FindProductByUserIdUseCase {
    constructor(private productRepository: IProductRepository) { }

    async execute(userId: string) {
        const products = await this.productRepository.findByUserId(userId);
        return products;
    }
}
