import { DomainError } from "./DomainError";

export class AuthenticationError extends DomainError {
    constructor() {
        super('Credenciais inválidas', 401);
    }
}