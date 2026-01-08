import { ProductValidationService } from "../../service/ProductValidationService";

export class ProductName {
    private constructor(private readonly value: string) { }

    static create(name: string): ProductName {
        ProductValidationService.validateProductNameFormat(name);

        const trimmedName = name.trim();
        return new ProductName(trimmedName);
    }

    getValue(): string {
        return this.value;
    }

    equals(other: ProductName): boolean {
        return this.value === other.value;
    }
}