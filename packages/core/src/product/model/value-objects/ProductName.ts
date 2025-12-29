import { ValidationError } from "../../../shared/errors/ValidationError";


export class ProductName {
    private constructor(private readonly value: string) { }

    static create(name: string): ProductName {
        if (!name || name.trim().length === 0) {
            throw new ValidationError("Nome do produto é obrigatório");
        }

        const trimmedName = name.trim();

        if (trimmedName.length < 2) {
            throw new ValidationError("Nome do produto deve ter pelo menos 2 caracteres");
        }

        if (trimmedName.length > 100) {
            throw new ValidationError("Nome do produto deve ter no máximo 100 caracteres");
        }

        return new ProductName(trimmedName);
    }

    getValue(): string {
        return this.value;
    }

    equals(other: ProductName): boolean {
        return this.value === other.value;
    }
}