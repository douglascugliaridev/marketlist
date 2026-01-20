export class ProductItemResponseDto {
    productId: string;
    purchaseId: string;
    price: number;
    previousPrice: number;
    amount: number;
    product?: {
        id: string;
        name: string;
        brand: string;
        listDefault: boolean;
    };

    static fromProductItem(productItem: any, productData?: any): ProductItemResponseDto {
        return {
            productId: productItem.getProductId(),
            purchaseId: productItem.getPurchaseId(),
            price: productItem.getPrice().getValue(),
            previousPrice: productItem.getPreviousPrice().getValue(),
            amount: productItem.getAmount().getValue(),
            product: productData ? {
                id: productData.id,
                name: productData.name,
                brand: productData.brand,
                listDefault: productData.listDefault
            } : undefined
        };
    }

    static fromProductItems(productItems: any[], productsData?: any[]): ProductItemResponseDto[] {
        return productItems.map((productItem, index) =>
            this.fromProductItem(productItem, productsData?.[index])
        );
    }
}