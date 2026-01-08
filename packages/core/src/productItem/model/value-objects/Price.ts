import { ProductItemValidationService } from "../../service/ProductItemValidationService";

export class Price {
    constructor(private readonly value: number) {
        ProductItemValidationService.validateProductItemPrice(value);
    }

    getValue(): number {
        return this.value;
    }

    toString(): string {
        return this.value.toString();
    }

    equals(other: Price): boolean {
        return this.value === other.getValue();
    }
}