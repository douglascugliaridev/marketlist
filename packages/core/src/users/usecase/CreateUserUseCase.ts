import { IUserRepository } from "../provider/IUserRepository";
import { IPasswordHasher } from "../provider/IPasswordHasher";
import { IUUIDProvider } from "../../shared/IUUIDProvider";
import { User } from "../model/user.entity";
import { UserId } from "../model/value-objects/UserId";
import { UserName } from "../model/value-objects/UserName";
import { UserEmail } from "../model/value-objects/UserEmail";
import { UserPasswordPlain } from "../model/value-objects/UserPasswordPlain";
import { UserPasswordHash } from "../model/value-objects/UserPasswordHash";
import { ConflictError } from "../../shared/errors/ConflictError";

interface Input {
    name: string;
    email: string;
    password: string;
}

export class CreateUserUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly passwordHasher: IPasswordHasher,
        private readonly uuidProvider: IUUIDProvider
    ) { }

    async execute(input: Input): Promise<{ userId: string }> {
        const emailAlreadyExists =
            await this.userRepository.findByEmail(input.email);

        if (emailAlreadyExists) {
            throw new ConflictError("Email já está em uso");
        }

        const userId = UserId.create(this.uuidProvider.generate());
        const name = UserName.create(input.name);
        const email = UserEmail.create(input.email);
        const password = UserPasswordPlain.create(input.password);

        const passwordHash = UserPasswordHash.create(
            await this.passwordHasher.hash(password.getValue())
        );

        const user = User.create({
            id: userId,
            name,
            email,
        });

        user.definePassword(passwordHash);

        await this.userRepository.save(user);

        return { userId: user.getId() };
    }
}
