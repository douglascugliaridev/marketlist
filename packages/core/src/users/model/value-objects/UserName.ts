import { UserValidationService } from "../../service/UserValidationService";

export class UserName {
    private constructor(private readonly value: string) { }

    static create(name: string): UserName {
        UserValidationService.validateUserNameFormat(name);

        const trimmedName = name.trim();
        return new UserName(trimmedName);
    }

    getValue(): string {
        return this.value;
    }

    equals(other: UserName): boolean {
        return this.value === other.value;
    }
}
