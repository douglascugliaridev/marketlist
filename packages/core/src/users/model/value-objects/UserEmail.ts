import { ValidationError } from "../../../shared/errors/ValidationError";

export class UserEmail {
    private constructor(private readonly value: string) { }

    static create(email: string): UserEmail {
        if (!email || typeof email !== "string" || email.trim().length === 0) {
            throw new ValidationError("Email do usuário é obrigatório");
        }

        const trimmedEmail = email.trim().toLowerCase();
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

        if (!isValid) {
            throw new ValidationError("Formato de email do usuário inválido");
        }

        return new UserEmail(trimmedEmail);
    }

    getValue(): string {
        return this.value;
    }

    equals(other: UserEmail): boolean {
        return this.value === other.value;
    }
}
