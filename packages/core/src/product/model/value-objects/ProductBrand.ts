import { ProductValidationService } from "../../service/ProductValidationService";

export class ProductBrand {
    private constructor(private readonly value: string) { }

    static create(brand: string): ProductBrand {
        ProductValidationService.validateProductBrandFormat(brand);

        const trimmedBrand = brand.trim();
        const titleCaseBrand = this.toTitleCase(trimmedBrand);
        return new ProductBrand(titleCaseBrand);
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

    equals(other: ProductBrand): boolean {
        return this.value === other.value;
    }
}