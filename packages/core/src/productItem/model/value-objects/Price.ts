import { BadRequest } from "../../../shared/errors/BadRequest";

export class Price {
    constructor(private readonly value: number) {
        if (value < 0) {
            throw new BadRequest('Price não pode ser negativo');
        }
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