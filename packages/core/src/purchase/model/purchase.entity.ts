import { ProductItem } from '../../productItem/model/product-item.entity';
import { PurchaseId } from './value-objects/PurchaseId';
import { PurchaseName } from './value-objects/PurchaseName';
import { UserId } from '../../users/model/value-objects/UserId';
import { MarketId } from '../../market/model/value-objects/MarketId';

export class Purchase {
    private constructor(
        private readonly id: PurchaseId,
        private readonly name: PurchaseName,
        private readonly userId: UserId,
        private readonly marketId: MarketId,
        private readonly items: ProductItem[],
        private readonly createdAt: Date,
        private readonly updatedAt: Date
    ) { }

    getId(): string {
        return this.id.getValue();
    }

    getName(): string | null {
        return this.name.getValue();
    }

    getUserId(): string {
        return this.userId.getValue();
    }

    getMarketId(): string {
        return this.marketId.getValue();
    }

    getItems(): ProductItem[] {
        return [...this.items];
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getUpdatedAt(): Date {
        return this.updatedAt;
    }

    // Calcula o total da compra somando todos os itens
    getTotal(): number {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }

    // Verifica se a compra tem itens
    hasItems(): boolean {
        return this.items.length > 0;
    }

    // Retorna a quantidade de itens na compra
    getItemsCount(): number {
        return this.items.length;
    }

    // Verificar se esta compra é igual a outra
    equals(other: Purchase): boolean {
        return this.id.getValue() === other.getId();
    }

    static create(props: {
        id: string;
        name?: string | null;
        userId: string;
        marketId: string;
        items?: ProductItem[];
        createdAt?: Date;
        updatedAt?: Date;
    }): Purchase {
        const now = new Date();
        return new Purchase(
            PurchaseId.create(props.id),
            PurchaseName.create(props.name),
            UserId.create(props.userId),
            MarketId.create(props.marketId),
            props.items || [],
            props.createdAt || now,
            props.updatedAt || now
        );
    }
}
