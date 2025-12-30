
import { CreateUserUseCase } from "../../src/users/usecase/CreateUserUseCase";
import { LoginUseCase } from "../../src/users/usecase/LoginUseCase";
import { GetUserByIdUseCase } from "../../src/users/usecase/GetUserByIdUseCase";
import { IUserRepository } from "../../src/users/provider/IUserRepository";
import { IPasswordHasher } from "../../src/users/provider/IPasswordHasher";
import { IUUIDProvider } from "../../src/shared/IUUIDProvider";
import { AuthenticationError } from "../../src/shared/errors/AuthenticationError";
import { NotFoundError } from "../../src/shared/errors/NotFoundError";


describe("User Use Cases", () => {

    describe("CreateUserUseCase", () => {

        it("deve criar um novo usuário", async () => {
            // Arrange
            const mockUserRepository: jest.Mocked<IUserRepository> = {
                save: jest.fn(),
                findById: jest.fn(),
                findByEmail: jest.fn()
            };

            const mockPasswordHasher: jest.Mocked<IPasswordHasher> = {
                hash: jest.fn(),
                compare: jest.fn()
            };

            const mockUUIDProvider: jest.Mocked<IUUIDProvider> = {
                generate: jest.fn()
            };

            const createUserUseCase = new CreateUserUseCase(
                mockUserRepository,
                mockPasswordHasher,
                mockUUIDProvider
            );

            const input = {
                name: "João Silva",
                email: "joao.silva@example.com",
                password: "senha123"
            };

            const generatedId = "123e4567-e89b-12d3-a456-426614174000";
            const hashedPassword = "hashed_password_123";

            mockUUIDProvider.generate.mockReturnValue(generatedId);
            mockUserRepository.findByEmail.mockResolvedValue(null);
            mockPasswordHasher.hash.mockResolvedValue(hashedPassword);
            mockUserRepository.save.mockResolvedValue(undefined);

            // Act
            const result = await createUserUseCase.execute(input);

            // Assert
            expect(result).toEqual({ userId: generatedId });
            expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(input.email);
            expect(mockUUIDProvider.generate).toHaveBeenCalled();
            expect(mockPasswordHasher.hash).toHaveBeenCalledWith(input.password);
            expect(mockUserRepository.save).toHaveBeenCalled();
        });
    });

    describe("LoginUseCase", () => {
        it("deve fazer login com credenciais válidas", async () => {
            // Arrange
            const mockUserRepository: jest.Mocked<IUserRepository> = {
                save: jest.fn(),
                findById: jest.fn(),
                findByEmail: jest.fn()
            };

            const mockPasswordHasher: jest.Mocked<IPasswordHasher> = {
                hash: jest.fn(),
                compare: jest.fn()
            };

            const loginUseCase = new LoginUseCase(
                mockUserRepository,
                mockPasswordHasher
            );

            const input = {
                email: "joao.silva@example.com",
                password: "senha123"
            };

            const mockUser = {
                getId: jest.fn().mockReturnValue("123e4567-e89b-12d3-a456-426614174000"),
                getName: jest.fn().mockReturnValue("João Silva"),
                getEmail: jest.fn().mockReturnValue("joao.silva@example.com"),
                authenticate: jest.fn().mockResolvedValue(true)
            } as any;

            mockUserRepository.findByEmail.mockResolvedValue(mockUser);
            mockPasswordHasher.compare.mockResolvedValue(true);

            // Act
            const result = await loginUseCase.execute(input);

            // Assert
            expect(result).toEqual({
                userId: "123e4567-e89b-12d3-a456-426614174000",
                name: "João Silva",
                email: "joao.silva@example.com"
            });
            expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(input.email);
            expect(mockUser.authenticate).toHaveBeenCalled();
        });

        it("deve retornar erro para credenciais inválidas", async () => {
            // Arrange
            const mockUserRepository: jest.Mocked<IUserRepository> = {
                save: jest.fn(),
                findById: jest.fn(),
                findByEmail: jest.fn()
            };

            const mockPasswordHasher: jest.Mocked<IPasswordHasher> = {
                hash: jest.fn(),
                compare: jest.fn()
            };

            const loginUseCase = new LoginUseCase(
                mockUserRepository,
                mockPasswordHasher
            );

            const input = {
                email: "joao.silva@example.com",
                password: "senha_errada"
            };

            const mockUser = {
                getId: jest.fn().mockReturnValue("123e4567-e89b-12d3-a456-426614174000"),
                getName: jest.fn().mockReturnValue("João Silva"),
                getEmail: jest.fn().mockReturnValue("joao.silva@example.com"),
                authenticate: jest.fn().mockResolvedValue(false)
            } as any;

            mockUserRepository.findByEmail.mockResolvedValue(mockUser);

            // Act & Assert
            await expect(loginUseCase.execute(input)).rejects.toThrow(AuthenticationError);
            expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(input.email);
            expect(mockUser.authenticate).toHaveBeenCalled();
        });
    });

    describe("GetUserUseCase", () => {
        it("deve buscar usuário por ID", async () => {
            // Arrange
            const mockUserRepository: jest.Mocked<IUserRepository> = {
                save: jest.fn(),
                findById: jest.fn(),
                findByEmail: jest.fn()
            };

            const getUserByIdUseCase = new GetUserByIdUseCase(
                mockUserRepository
            );

            const userId = "123e4567-e89b-12d3-a456-426614174000";

            const mockUser = {
                getId: jest.fn().mockReturnValue(userId),
                getName: jest.fn().mockReturnValue("João Silva"),
                getEmail: jest.fn().mockReturnValue("joao.silva@example.com")
            } as any;

            mockUserRepository.findById.mockResolvedValue(mockUser);

            // Act
            const result = await getUserByIdUseCase.execute(userId);

            // Assert
            expect(result).toEqual({
                id: userId,
                name: "João Silva",
                email: "joao.silva@example.com"
            });
            expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);
        });

        it("deve retornar erro quando usuário não é encontrado", async () => {
            // Arrange
            const mockUserRepository: jest.Mocked<IUserRepository> = {
                save: jest.fn(),
                findById: jest.fn(),
                findByEmail: jest.fn()
            };

            const getUserByIdUseCase = new GetUserByIdUseCase(
                mockUserRepository
            );

            const userId = "123e4567-e89b-12d3-a456-426614174000";

            mockUserRepository.findById.mockResolvedValue(null);

            // Act & Assert
            await expect(getUserByIdUseCase.execute(userId)).rejects.toThrow(NotFoundError);
            expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);
        });
    });
});