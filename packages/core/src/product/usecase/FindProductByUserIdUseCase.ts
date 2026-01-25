import { IProductRepository } from "../provider/IProductRepository";
import { IPaginationParams, PaginatedResult } from "../../shared/IPagination";

export class FindProductByUserIdUseCase {
    constructor(private productRepository: IProductRepository) { }

    async execute(userId: string, pagination?: IPaginationParams) {
        const page = pagination?.page || 1;
        const limit = pagination?.limit || 10;

        const [products, total] = await Promise.all([
            this.productRepository.findByUserId(userId, pagination),
            this.productRepository.countByUserId(userId)
        ]);

        return new PaginatedResult(products, page, limit, total);
    }
}
