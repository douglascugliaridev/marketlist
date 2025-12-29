import { UserId } from "../../users/model/value-objects/UserId";
import { ProductId } from "./value-objects/ProductId";
import { ProductName } from "./value-objects/ProductName";

export class Product {
    private constructor(
        private readonly id: ProductId,
        private readonly name: ProductName,
        private readonly brand: string,
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
        return this.brand;
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
            props.brand,
            props.listDefault,
            UserId.create(props.userId)
        );
    }
}
