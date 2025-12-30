import { ValidationError } from "../../../shared/errors/ValidationError";

export class PurchaseName {
    private constructor(private readonly value: string | null) { }

    static create(name: string | null | undefined): PurchaseName {
        if (name !== undefined && name !== null) {
            const trimmedName = name.trim();

            if (trimmedName.length > 100) {
                throw new ValidationError("Nome da compra não pode ter mais de 100 caracteres");
            }

            return new PurchaseName(trimmedName.length > 0 ? trimmedName : null);
        }

        return new PurchaseName(null);
    }

    getValue(): string | null {
        return this.value;
    }

    equals(other: PurchaseName): boolean {
        return this.value === other.value;
    }

    toString(): string {
        return this.value || '';
    }
}
