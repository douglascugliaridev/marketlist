import { UserValidationService } from "../../service/UserValidationService";

export class UserId {
    private constructor(private readonly value: string) { }

    static create(id: string): UserId {
        UserValidationService.validateUserIdFormat(id);

        const trimmedId = id.trim();
        return new UserId(trimmedId);
    }

    getValue(): string {
        return this.value;
    }

    equals(other: UserId): boolean {
        return this.value === other.value;
    }
}
