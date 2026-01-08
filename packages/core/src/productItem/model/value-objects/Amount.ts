import { ProductItemValidationService } from "../../service/ProductItemValidationService";

export class Amount {
    constructor(private readonly value: number) {
        ProductItemValidationService.validateProductItemAmount(value);
    }

    getValue(): number {
        return this.value;
    }

    toString(): string {
        return this.value.toString();
    }
}