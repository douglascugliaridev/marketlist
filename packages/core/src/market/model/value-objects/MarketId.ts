import { MarketValidationService } from "../../service/MarketValidationService";

export class MarketId {
    private constructor(private readonly value: string) { }

    static create(id: string): MarketId {
        MarketValidationService.validateMarketIdFormat(id);

        const trimmedId = id.trim();
        return new MarketId(trimmedId);
    }

    getValue(): string {
        return this.value;
    }

    equals(other: MarketId): boolean {
        return this.value === other.value;
    }
}
