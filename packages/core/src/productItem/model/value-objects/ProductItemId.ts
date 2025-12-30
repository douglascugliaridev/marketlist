import { ValidationError } from "../../../shared/errors/ValidationError";

export class ProductItemId {
    private constructor(private readonly value: string) { }

    static create(id: string): ProductItemId {
        if (!id || id.trim().length === 0) {
            throw new ValidationError("ID do item do produto é obrigatório");
        }

        const trimmedId = id.trim();

        if (!this.isValid(trimmedId)) {
            throw new ValidationError("ID do item do produto inválido");
        }

        return new ProductItemId(trimmedId);
    }

    getValue(): string {
        return this.value;
    }

    equals(other: ProductItemId): boolean {
        return this.value === other.value;
    }

    private static isValid(id: string): boolean {
        return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
            id
        );
    }
}