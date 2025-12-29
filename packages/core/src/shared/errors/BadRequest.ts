import { DomainError } from "./DomainError";

export class BadRequest extends DomainError {
    constructor(message: string) {
        super(message, 400);
    }
}