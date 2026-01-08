import { User } from "../model/user.entity";
import { DomainError } from "../../shared/DomainError";

export class UserIdValidationException extends DomainError {
    constructor(message: string) {
        super(message, 'UserIdValidationException');
    }
}

export class UserNameValidationException extends DomainError {
    constructor(message: string) {
        super(message, 'UserNameValidationException');
    }
}

export class UserEmailValidationException extends DomainError {
    constructor(message: string) {
        super(message, 'UserEmailValidationException');
    }
}

export class UserPasswordValidationException extends DomainError {
    constructor(message: string) {
        super(message, 'UserPasswordValidationException');
    }
}

export class UserValidationException extends DomainError {
    constructor(message: string) {
        super(message, 'UserValidationException');
    }
}

export class UserNotFoundException extends DomainError {
    constructor(message: string) {
        super(message, 'UserNotFoundException');
    }
}

export class UserAlreadyExistsException extends DomainError {
    constructor(message: string) {
        super(message, 'UserAlreadyExistsException');
    }
}

export class UserAuthenticationException extends DomainError {
    constructor(message: string = 'Credenciais inválidas') {
        super(message, 'UserAuthenticationException');
    }
}

export class UserPasswordHashValidationException extends DomainError {
    constructor(message: string) {
        super(message, 'UserPasswordHashValidationException');
    }
}

export class UserValidationService {
    static validateUserExists(user: User | null): User {
        if (!user) {
            throw new UserNotFoundException("Usuário não encontrado");
        }
        return user;
    }

    static validateUniqueEmail(existingUser: User | null, email: string): void {
        if (existingUser) {
            throw new UserAlreadyExistsException(`Email já está em uso: ${email}`);
        }
    }

    static validateAuthentication(user: User | null): User {
        if (!user) {
            throw new UserAuthenticationException();
        }
        return user;
    }

    static validateCredentials(isAuthenticated: boolean): void {
        if (!isAuthenticated) {
            throw new UserAuthenticationException();
        }
    }

    static validateUserIdFormat(id: string): void {
        if (!id || typeof id !== "string" || id.trim().length === 0) {
            throw new UserIdValidationException("User ID is required");
        }

        const trimmedId = id.trim();

        if (!this.isValidUUID(trimmedId)) {
            throw new UserIdValidationException("Invalid user ID format");
        }
    }

    static validateUserNameFormat(name: string): void {
        if (!name || name.trim().length === 0) {
            throw new UserNameValidationException("User name is required");
        }

        const trimmedName = name.trim();
        if (trimmedName.length < 2) {
            throw new UserNameValidationException("User name must have at least 2 characters");
        }

        if (trimmedName.length > 100) {
            throw new UserNameValidationException("User name must have at most 100 characters");
        }
    }

    static validateUserEmailFormat(email: string): void {
        if (!email || typeof email !== "string" || email.trim().length === 0) {
            throw new UserEmailValidationException("User email is required");
        }

        const trimmedEmail = email.trim().toLowerCase();
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

        if (!isValid) {
            throw new UserEmailValidationException("Invalid user email format");
        }
    }

    static validateUserPasswordFormat(password: string): void {
        if (!password || password.trim().length === 0) {
            throw new UserPasswordValidationException("User password is required");
        }

        if (password.length < 6) {
            throw new UserPasswordValidationException("User password must have at least 6 characters");
        }

        if (password.length > 100) {
            throw new UserPasswordValidationException("User password must have at most 100 characters");
        }
    }

    static validateUserPasswordHashFormat(hash: string): void {
        if (!hash || typeof hash !== "string" || hash.trim().length === 0) {
            throw new UserPasswordHashValidationException("User password hash is required");
        }
    }

    private static isValidUUID(id: string): boolean {
        return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
    }
}
