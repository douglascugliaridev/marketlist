import { UserValidationService } from "../../service/UserValidationService";

export class UserPasswordPlain {
    private constructor(private readonly value: string) { }

    static create(password: string): UserPasswordPlain {
        UserValidationService.validateUserPasswordFormat(password);

        return new UserPasswordPlain(password);
    }

    getValue(): string {
        return this.value;
    }
}
