export class ProductItemResponseDto {
    productId: string;
    purchaseId: string;
    price: number;
    previousPrice: number;
    amount: number;

    static fromProductItem(productItem: any): ProductItemResponseDto {
        return {
            productId: productItem.getProductId(),
            purchaseId: productItem.getPurchaseId(),
            price: productItem.getPrice(),
            previousPrice: productItem.getPreviousPrice(),
            amount: productItem.getAmount()
        };
    }

    static fromProductItems(productItems: any[]): ProductItemResponseDto[] {
        return productItems.map(productItem => this.fromProductItem(productItem));
    }
}