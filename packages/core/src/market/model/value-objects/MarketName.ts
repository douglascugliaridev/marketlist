import { ValidationError } from "../../../shared/errors/ValidationError";

export class MarketName {
    private constructor(private readonly value: string) { }

    static create(name: string): MarketName {
        if (!name || typeof name !== "string") {
            throw new ValidationError("Nome do mercado é obrigatório");
        }

        const trimmedName = name.trim().toLowerCase();
        if (trimmedName.length < 2) {
            throw new ValidationError("Nome do mercado deve ter pelo menos 2 caracteres");
        }

        if (trimmedName.length > 100) {
            throw new ValidationError("Nome do mercado deve ter no máximo 100 caracteres");
        }

        return new MarketName(trimmedName);
    }

    getValue(): string {
        return this.value;
    }

    getNormalizedValue(): string {
        return this.value.toLowerCase();
    }

    equals(other: MarketName): boolean {
        return this.getNormalizedValue() === other.getNormalizedValue();
    }

    equalsIgnoreCase(otherName: string): boolean {
        return this.getNormalizedValue() === otherName.trim().toLowerCase();
    }
}
