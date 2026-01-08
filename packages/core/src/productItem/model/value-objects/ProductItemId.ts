import { ProductItemValidationService } from "../../service/ProductItemValidationService";

export class ProductItemId {
    private constructor(private readonly value: string) { }

    static create(id: string): ProductItemId {
        ProductItemValidationService.validateProductItemIdFormat(id);

        const trimmedId = id.trim();
        return new ProductItemId(trimmedId);
    }

    getValue(): string {
        return this.value;
    }

    equals(other: ProductItemId): boolean {
        return this.value === other.value;
    }
}