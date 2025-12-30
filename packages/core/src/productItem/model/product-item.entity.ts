import { ProductItemId } from "./value-objects/ProductItemId";
import { Product } from "../../product/model/product.entity";
import { Purchase } from "../../purchase/model/purchase.entity";
import { Price } from "./value-objects/Price";
import { Amount } from "./value-objects/Amount";

export class ProductItem {
    private constructor(
        private readonly id: ProductItemId,
        private readonly product: Product,
        private readonly purchase: Purchase,
        private readonly price: Price,
        private readonly previousPrice: Price,
        private readonly amount: Amount,
        private readonly createdAt: Date,
        private readonly updatedAt: Date
    ) { }

    getId(): string {
        return this.id.getValue();
    }

    getProduct(): Product {
        return this.product;
    }

    getPurchase(): Purchase {
        return this.purchase;
    }

    getPrice(): Price {
        return this.price;
    }

    getAmount(): Amount {
        return this.amount;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getUpdatedAt(): Date {
        return this.updatedAt;
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
        return this.id.getValue() === other.getId();
    }

    static create(props: {
        id: string;
        product: Product;
        purchase: Purchase;
        price: number;
        previousPrice: number;
        amount: number;
        createdAt?: Date;
        updatedAt?: Date;
    }): ProductItem {
        const now = new Date();
        return new ProductItem(
            ProductItemId.create(props.id),
            props.product,
            props.purchase,
            new Price(props.price),
            new Price(props.previousPrice),
            new Amount(props.amount),
            props.createdAt || now,
            props.updatedAt || now
        );
    }
}
