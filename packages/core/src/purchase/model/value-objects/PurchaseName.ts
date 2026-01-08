import { PurchaseValidationService } from "../../service/PurchaseValidationService";

export class PurchaseName {
    private constructor(private readonly value: string | null) { }

    static create(name: string | null | undefined): PurchaseName {
        PurchaseValidationService.validatePurchaseNameFormat(name);

        if (name !== undefined && name !== null) {
            const trimmedName = name.trim();
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
