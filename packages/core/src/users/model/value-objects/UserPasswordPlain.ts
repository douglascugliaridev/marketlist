import { ValidationError } from "../../../shared/errors/ValidationError";

export class UserPasswordPlain {
    private constructor(private readonly value: string) { }

    static create(password: string): UserPasswordPlain {
        if (!password || typeof password !== "string") {
            throw new ValidationError("Senha do usuário é obrigatória");
        }

        if (password.length < 8) {
            throw new ValidationError("Senha do usuário deve ter pelo menos 8 caracteres");
        }

        return new UserPasswordPlain(password);
    }

    getValue(): string {
        return this.value;
    }
}
