export class ProductResponseDto {
    id: string;
    name: string;
    brand: string;
    listDefault: boolean;
    userId: string;

    static fromProduct(product: any): ProductResponseDto {
        return {
            id: product.getId(),
            name: product.getName(),
            brand: product.getBrand(),
            listDefault: product.isListDefault(),
            userId: product.getUserId()
        };
    }

    static fromProducts(products: any[]): ProductResponseDto[] {
        return products.map(product => this.fromProduct(product));
    }
}
