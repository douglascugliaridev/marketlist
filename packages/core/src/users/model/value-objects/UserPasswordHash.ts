import { UserValidationService } from "../../service/UserValidationService";

export class UserPasswordHash {
    private constructor(private readonly value: string) { }

    static create(hash: string): UserPasswordHash {
        UserValidationService.validateUserPasswordHashFormat(hash);

        return new UserPasswordHash(hash.trim());
    }

    getValue(): string {
        return this.value;
    }

    equals(other: UserPasswordHash): boolean {
        return this.value === other.value;
    }
}
