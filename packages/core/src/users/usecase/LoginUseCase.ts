import { IUserRepository } from "../provider/IUserRepository";
import { IPasswordHasher } from "../provider/IPasswordHasher";
import { UserPasswordPlain } from "../model/value-objects/UserPasswordPlain";
import { UserValidationService } from "../service/UserValidationService";

interface Input {
    email: string;
    password: string;
}

export type LoginOutput = {
    userId: string;
    name: string;
    email: string;
};

export class LoginUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly passwordHasher: IPasswordHasher
    ) { }

    async execute(input: Input): Promise<LoginOutput> {
        const password = UserPasswordPlain.create(input.password);

        const user = await this.userRepository.findByEmail(input.email);

        const validatedUser = UserValidationService.validateAuthentication(user);

        const isAuthenticated = await validatedUser.authenticate(
            password,
            this.passwordHasher
        );

        UserValidationService.validateCredentials(isAuthenticated);

        return {
            userId: validatedUser.getId(),
            name: validatedUser.getName(),
            email: validatedUser.getEmail(),
        };
    }
}
