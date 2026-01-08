import { PurchaseValidationService } from "../../service/PurchaseValidationService";

export class PurchaseId {
    private constructor(private readonly value: string) { }

    static create(id: string): PurchaseId {
        PurchaseValidationService.validatePurchaseIdFormat(id);

        const trimmedId = id.trim();
        return new PurchaseId(trimmedId);
    }

    getValue(): string {
        return this.value;
    }

    equals(other: PurchaseId): boolean {
        return this.value === other.value;
    }
}
