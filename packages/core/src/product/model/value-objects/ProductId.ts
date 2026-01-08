import { ProductValidationService } from "../../service/ProductValidationService";

export class ProductId {
    private constructor(private readonly value: string) { }

    static create(id: string): ProductId {
        ProductValidationService.validateProductIdFormat(id);

        const trimmedId = id.trim();
        return new ProductId(trimmedId);
    }

    getValue(): string {
        return this.value;
    }

    equals(other: ProductId): boolean {
        return this.value === other.value;
    }
}