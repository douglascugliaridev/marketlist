export class PurchaseResponseDto {

    id: string;
    name: string;
    userId: string;
    marketId: string;

    static fromPurchase(purchase: any): PurchaseResponseDto {
        return {
            id: purchase.getId(),
            name: purchase.getName(),
            userId: purchase.getUserId(),
            marketId: purchase.getMarketId()
        };
    }

    static fromPurchases(purchases: any[]): PurchaseResponseDto[] {
        return purchases.map(purchase => this.fromPurchase(purchase));
    }
}
