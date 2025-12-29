import { ValidationError } from "../../../shared/errors/ValidationError";

export class UserPasswordHash {
    private constructor(private readonly value: string) { }

    static create(hash: string): UserPasswordHash {
        if (!hash || typeof hash !== "string" || hash.trim().length === 0) {
            throw new ValidationError("Hash da senha do usuário é obrigatório");
        }

        return new UserPasswordHash(hash.trim());
    }

    getValue(): string {
        return this.value;
    }

    equals(other: UserPasswordHash): boolean {
        return this.value === other.value;
    }
}
