import { ProductValidationService } from "../../service/ProductValidationService";

export class ProductName {
    private constructor(private readonly value: string) { }

    static create(name: string): ProductName {
        ProductValidationService.validateProductNameFormat(name);

        const trimmedName = name.trim();
        const titleCaseName = this.toTitleCase(trimmedName);
        return new ProductName(titleCaseName);
    }

    private static toTitleCase(str: string): string {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    getValue(): string {
        return this.value;
    }

    equals(other: ProductName): boolean {
        return this.value === other.value;
    }
}