import { ProductItemValidationService } from "../../service/ProductItemValidationService";

export class PurchaseId {
    private constructor(private readonly value: string) { }

    static create(id: string): PurchaseId {
        ProductItemValidationService.validateProductItemPurchaseIdFormat(id);

        const trimmedId = id.trim();

        return new PurchaseId(trimmedId);
    }

    getValue(): string {
        return this.value;
    }

    equals(other: PurchaseId): boolean {
        return this.value === other.value;
    }

    // private static isValid(id: string): boolean {
    //     return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    //         id
    //     );
    // }
}