import { Price } from "./value-objects/Price";
import { Amount } from "./value-objects/Amount";

export class ProductItem {
    private constructor(
        private readonly productId: string,
        private readonly purchaseId: string,
        private readonly price: Price,
        private readonly previousPrice: Price,
        private readonly amount: Amount
    ) { }

    getProductId(): string {
        return this.productId;
    }

    getPurchaseId(): string {
        return this.purchaseId;
    }

    getPrice(): Price {
        return this.price;
    }

    getAmount(): Amount {
        return this.amount;
    }

    // Calcula o preço total do item (preço unitário * quantidade)
    getTotalPrice(): number {
        return this.price.getValue() * this.amount.getValue();
    }

    // Obtém o preço anterior do item
    getPreviousPrice(): Price {
        return this.previousPrice;
    }

    // Verifica se o preço foi alterado em relação ao preço anterior
    hasPriceChanged(): boolean {
        return this.price.getValue() !== this.previousPrice.getValue();
    }

    // Verificar se este item de produto é igual a outro
    equals(other: ProductItem): boolean {
        return this.productId === other.getProductId();
    }

    static create(props: {
        productId: string;
        purchaseId: string;
        price: number;
        previousPrice: number;
        amount: number;
    }): ProductItem {
        return new ProductItem(
            props.productId,
            props.purchaseId,
            new Price(props.price),
            new Price(props.previousPrice),
            new Amount(props.amount)
        );
    }
}
