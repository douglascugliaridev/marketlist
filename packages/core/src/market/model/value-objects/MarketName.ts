import { MarketValidationService } from "../../service/MarketValidationService";

export class MarketName {
    private constructor(private readonly value: string) { }

    static create(name: string): MarketName {
        MarketValidationService.validateMarketNameFormat(name);

        const trimmedName = name.trim().charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        return new MarketName(trimmedName);
    }

    getValue(): string {
        return this.value;
    }

    getNormalizedValue(): string {
        return this.value.charAt(0).toUpperCase() + this.value.slice(1).toLowerCase();
    }

    equals(other: MarketName): boolean {
        return this.getNormalizedValue() === other.getNormalizedValue();
    }

    equalsIgnoreCase(otherName: string): boolean {
        return this.getNormalizedValue() === otherName.trim().charAt(0).toUpperCase() + otherName.slice(1).toLowerCase();
    }
}
