// product-item.entity.ts
export class ProductItem {
    constructor(
        public readonly productId: bigint,
        public readonly purchaseId: bigint,
        public price: number,
        public amount: bigint
    ) { }
}
