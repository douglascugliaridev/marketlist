import { MarketValidationService } from "../../service/MarketValidationService";

export class MarketName {
    private constructor(private readonly value: string) { }

    static create(name: string): MarketName {
        MarketValidationService.validateMarketNameFormat(name);

        const trimmedName = name.trim().toLowerCase();
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
