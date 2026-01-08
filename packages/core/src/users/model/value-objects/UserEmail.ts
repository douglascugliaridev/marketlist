import { UserValidationService } from "../../service/UserValidationService";

export class UserEmail {
    private constructor(private readonly value: string) { }

    static create(email: string): UserEmail {
        UserValidationService.validateUserEmailFormat(email);

        const trimmedEmail = email.trim().toLowerCase();
        return new UserEmail(trimmedEmail);
    }

    getValue(): string {
        return this.value;
    }

    equals(other: UserEmail): boolean {
        return this.value === other.value;
    }
}
