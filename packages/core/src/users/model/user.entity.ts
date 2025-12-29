import { UserId } from "./value-objects/UserId";
import { UserName } from "./value-objects/UserName";
import { UserEmail } from "./value-objects/UserEmail";
import { UserPasswordHash } from "./value-objects/UserPasswordHash";
import { UserPasswordPlain } from "./value-objects/UserPasswordPlain";
import { IPasswordHasher } from "../provider/IPasswordHasher";

export class User {
    private passwordHash?: UserPasswordHash;

    private constructor(
        private readonly id: UserId,
        private name: UserName,
        private email: UserEmail
    ) { }

    static create(props: {
        id: UserId;
        name: UserName;
        email: UserEmail;
    }): User {
        return new User(props.id, props.name, props.email);
    }

    static reconstitute(props: {
        id: string;
        name: string;
        email: string;
        passwordHash?: string;
    }): User {
        const idVo = UserId.create(props.id);
        const nameVo = UserName.create(props.name);
        const emailVo = UserEmail.create(props.email);

        const user = new User(idVo, nameVo, emailVo);

        if (props.passwordHash) {
            user.definePassword(UserPasswordHash.create(props.passwordHash));
        }

        return user;
    }

    definePassword(hash: UserPasswordHash): void {
        this.passwordHash = hash;
    }

    async authenticate(password: UserPasswordPlain, hasher: IPasswordHasher): Promise<boolean> {
        if (!this.passwordHash) {
            return false;
        }

        return await hasher.compare(password.getValue(), this.passwordHash.getValue());
    }

    getId(): string {
        return this.id.getValue();
    }

    getEmail(): string {
        return this.email.getValue();
    }

    getName(): string {
        return this.name.getValue();
    }

    getPasswordHash(): string | undefined {
        return this.passwordHash?.getValue();
    }
}
