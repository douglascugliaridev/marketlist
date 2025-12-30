import { BadRequest } from "../../../shared/errors/BadRequest";

export class Amount {
    constructor(private readonly value: number) {
        if (value < 0) {
            throw new BadRequest('Amount não pode ser negativo');
        }
    }

    getValue(): number {
        return this.value;
    }

    toString(): string {
        return this.value.toString();
    }
}