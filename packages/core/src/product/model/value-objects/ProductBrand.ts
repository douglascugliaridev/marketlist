import { ProductValidationService } from "../../service/ProductValidationService";

export class ProductBrand {
    private constructor(private readonly value: string) { }

    static create(brand: string): ProductBrand {
        ProductValidationService.validateProductBrandFormat(brand);

        const trimmedBrand = brand.trim();
        return new ProductBrand(trimmedBrand);
    }

    getValue(): string {
        return this.value;
    }

    equals(other: ProductBrand): boolean {
        return this.value === other.value;
    }
}