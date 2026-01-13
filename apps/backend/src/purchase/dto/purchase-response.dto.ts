export class PurchaseResponseDto {

    id: string;
    name: string;
    userId: string;
    marketId: string;

    static fromPurchase(purchase: any): PurchaseResponseDto {
        return {
            id: purchase.id?.value || purchase.id,
            name: purchase.name?.value || purchase.name,
            userId: purchase.userId?.value || purchase.userId,
            marketId: purchase.marketId?.value || purchase.marketId
        };
    }

    static fromPurchases(purchases: any[]): PurchaseResponseDto[] {
        return purchases.map(purchase => this.fromPurchase(purchase));
    }
}
