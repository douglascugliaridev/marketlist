import { IUserRepository } from "../provider/IUserRepository";
import { IPasswordHasher } from "../provider/IPasswordHasher";
import { UserPasswordPlain } from "../model/value-objects/UserPasswordPlain";
import { AuthenticationError } from "../../shared/errors/AuthenticationError";

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

        if (!user) {
            throw new AuthenticationError();
        }

        const isAuthenticated = await user.authenticate(
            password,
            this.passwordHasher
        );

        if (!isAuthenticated) {
            throw new AuthenticationError();
        }

        return {
            userId: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
        };
    }
}
