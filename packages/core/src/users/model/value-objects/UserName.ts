import { ValidationError } from "../../../shared/errors/ValidationError";

export class UserName {
    private constructor(private readonly value: string) { }

    static create(name: string): UserName {
        if (!name || typeof name !== "string" || name.trim().length === 0) {
            throw new ValidationError("Nome do usuário é obrigatório");
        }

        const trimmedName = name.trim();

        if (trimmedName.length < 3) {
            throw new ValidationError("Nome do usuário deve ter pelo menos 3 caracteres");
        }

        if (trimmedName.length > 100) {
            throw new ValidationError("Nome do usuário deve ter no máximo 100 caracteres");
        }

        return new UserName(trimmedName);
    }

    getValue(): string {
        return this.value;
    }

    equals(other: UserName): boolean {
        return this.value === other.value;
    }
}
