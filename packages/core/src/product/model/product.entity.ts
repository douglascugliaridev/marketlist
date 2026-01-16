import { UserId } from "../../users/model/value-objects/UserId";
import { ProductId } from "./value-objects/ProductId";
import { ProductName } from "./value-objects/ProductName";
import { ProductBrand } from "./value-objects/ProductBrand";

export class Product {
    private constructor(
        private readonly id: ProductId,
        private readonly name: ProductName,
        private readonly brand: ProductBrand,
        private readonly listDefault: boolean,
        private readonly userId: UserId
    ) { }

    getId(): string {
        return this.id.getValue();
    }

    getName(): string {
        return this.name.getValue();
    }

    getUserId(): string {
        return this.userId.getValue();
    }

    getBrand(): string {
        return this.brand.getValue();
    }

    isListDefault(): boolean {
        return this.listDefault;
    }

    static create(props: {
        id: string;
        name: string;
        brand: string;
        listDefault: boolean;
        userId: string;
    }): Product {
        return new Product(
            ProductId.create(props.id),
            ProductName.create(props.name),
            ProductBrand.create(props.brand),
            props.listDefault,
            UserId.create(props.userId)
        );
    }

    updateName(name: string): Product {
        return new Product(
            this.id,
            ProductName.create(name),
            this.brand,
            this.listDefault,
            this.userId
        );
    }

    updateBrand(brand: string): Product {
        return new Product(
            this.id,
            this.name,
            ProductBrand.create(brand),
            this.listDefault,
            this.userId
        );
    }
}
