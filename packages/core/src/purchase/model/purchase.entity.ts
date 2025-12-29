import { ProductItem } from '../../productItem/model/product-item.entity';

export class Purchase {
    constructor(
        public readonly id: bigint,
        public name: string | null,
        public readonly userId: string,
        public readonly marketId: bigint,
        public items: ProductItem[] = []
    ) { }
}
