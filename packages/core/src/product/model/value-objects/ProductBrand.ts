import { ValidationError } from "../../../shared/errors/ValidationError";

export class ProductBrand {
    private constructor(private readonly value: string) { }

    static create(brand: string): ProductBrand {
        if (!brand || brand.trim().length === 0) {
            throw new ValidationError("Marca do produto é obrigatória");
        }

        const trimmedBrand = brand.trim();

        if (trimmedBrand.length < 1) {
            throw new ValidationError("Marca do produto deve ter pelo menos 1 caractere");
        }

        if (trimmedBrand.length > 50) {
            throw new ValidationError("Marca do produto deve ter no máximo 50 caracteres");
        }

        return new ProductBrand(trimmedBrand);
    }

    getValue(): string {
        return this.value;
    }

    equals(other: ProductBrand): boolean {
        return this.value === other.value;
    }
}