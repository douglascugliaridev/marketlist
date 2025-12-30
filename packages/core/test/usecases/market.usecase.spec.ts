import { CreateMarketUseCase } from "../../src/market/usecase/CreateMarketUseCase";
import { FindMarketUseCase } from "../../src/market/usecase/FindMarketUseCase";
import { UpdateMarketUseCase } from "../../src/market/usecase/UpdateMarketUseCase";
import { DeleteMarketUseCase } from "../../src/market/usecase/DeleteMarketUseCase";
import { IMarketRepository } from "../../src/market/provider/IMarketRepository";
import { IUUIDProvider } from "../../src/shared/IUUIDProvider";
import { ConflictError } from "../../src/shared/errors/ConflictError";
import { NotFoundError } from "../../src/shared/errors/NotFoundError";
import { BadRequest } from "../../src/shared/errors/BadRequest";

describe("Market Use Cases", () => {

    describe("CreateMarketUseCase", () => {
        it("deve criar um novo supermercado", async () => {
            // Arrange
            const mockMarketRepository: jest.Mocked<IMarketRepository> = {
                save: jest.fn(),
                findByName: jest.fn(),
                findById: jest.fn(),
                findAll: jest.fn(),
                delete: jest.fn(),
                update: jest.fn()
            };

            const mockUUIDProvider: jest.Mocked<IUUIDProvider> = {
                generate: jest.fn()
            };

            const createMarketUseCase = new CreateMarketUseCase(
                mockMarketRepository,
                mockUUIDProvider
            );

            const marketProps = {
                name: "Supermercado Central",
                userId: "123e4567-e89b-12d3-a456-426614174000"
            };

            const generatedId = "456e7890-e89b-12d3-a456-426614174001";

            mockUUIDProvider.generate.mockReturnValue(generatedId);
            mockMarketRepository.findByName.mockResolvedValue(null);
            mockMarketRepository.save.mockResolvedValue(undefined);

            // Act
            const result = await createMarketUseCase.execute(marketProps);

            // Assert
            expect(result).toEqual({ marketId: generatedId });
            expect(mockMarketRepository.findByName).toHaveBeenCalledWith(marketProps.name);
            expect(mockUUIDProvider.generate).toHaveBeenCalled();
            expect(mockMarketRepository.save).toHaveBeenCalled();
        });

        it("deve retornar erro para nome duplicado", async () => {
            // Arrange
            const mockMarketRepository: jest.Mocked<IMarketRepository> = {
                save: jest.fn(),
                findByName: jest.fn(),
                findById: jest.fn(),
                findAll: jest.fn(),
                delete: jest.fn(),
                update: jest.fn()
            };

            const mockUUIDProvider: jest.Mocked<IUUIDProvider> = {
                generate: jest.fn()
            };

            const createMarketUseCase = new CreateMarketUseCase(
                mockMarketRepository,
                mockUUIDProvider
            );

            const marketProps = {
                name: "Supermercado Central",
                userId: "123e4567-e89b-12d3-a456-426614174000"
            };

            const existingMarket = {
                getId: jest.fn().mockReturnValue("existing-id"),
                getName: jest.fn().mockReturnValue("Supermercado Central"),
                getUserId: jest.fn().mockReturnValue("user-id")
            } as any;

            mockMarketRepository.findByName.mockResolvedValue(existingMarket);

            // Act & Assert
            await expect(createMarketUseCase.execute(marketProps)).rejects.toThrow(ConflictError);
            expect(mockMarketRepository.findByName).toHaveBeenCalledWith(marketProps.name);
        });
    });

    describe("FindMarketUseCase", () => {
        it("deve buscar mercado por ID", async () => {
            // Arrange
            const mockMarketRepository: jest.Mocked<IMarketRepository> = {
                save: jest.fn(),
                findByName: jest.fn(),
                findById: jest.fn(),
                findAll: jest.fn(),
                delete: jest.fn(),
                update: jest.fn()
            };

            const findMarketUseCase = new FindMarketUseCase(mockMarketRepository);

            const marketId = "123e4567-e89b-12d3-a456-426614174000";
            const mockMarket = {
                getId: jest.fn().mockReturnValue(marketId),
                getName: jest.fn().mockReturnValue("Supermercado Central"),
                getUserId: jest.fn().mockReturnValue("user-id")
            } as any;

            mockMarketRepository.findById.mockResolvedValue(mockMarket);

            // Act
            const result = await findMarketUseCase.execute({ id: marketId });

            // Assert
            expect(result).toBe(mockMarket);
            expect(mockMarketRepository.findById).toHaveBeenCalledWith(marketId);
        });

        it("deve buscar mercado por nome", async () => {
            // Arrange
            const mockMarketRepository: jest.Mocked<IMarketRepository> = {
                save: jest.fn(),
                findByName: jest.fn(),
                findById: jest.fn(),
                findAll: jest.fn(),
                delete: jest.fn(),
                update: jest.fn()
            };

            const findMarketUseCase = new FindMarketUseCase(mockMarketRepository);

            const marketName = "Supermercado Central";
            const mockMarket = {
                getId: jest.fn().mockReturnValue("market-id"),
                getName: jest.fn().mockReturnValue(marketName),
                getUserId: jest.fn().mockReturnValue("user-id")
            } as any;

            mockMarketRepository.findByName.mockResolvedValue(mockMarket);

            // Act
            const result = await findMarketUseCase.execute({ name: marketName });

            // Assert
            expect(result).toBe(mockMarket);
            expect(mockMarketRepository.findByName).toHaveBeenCalledWith(marketName);
        });

        it("deve retornar erro quando nenhum parâmetro é fornecido", async () => {
            // Arrange
            const mockMarketRepository: jest.Mocked<IMarketRepository> = {
                save: jest.fn(),
                findByName: jest.fn(),
                findById: jest.fn(),
                findAll: jest.fn(),
                delete: jest.fn(),
                update: jest.fn()
            };

            const findMarketUseCase = new FindMarketUseCase(mockMarketRepository);

            // Act & Assert
            await expect(findMarketUseCase.execute({})).rejects.toThrow(BadRequest);
        });

        it("deve retornar erro quando mercado não é encontrado por ID", async () => {
            // Arrange
            const mockMarketRepository: jest.Mocked<IMarketRepository> = {
                save: jest.fn(),
                findByName: jest.fn(),
                findById: jest.fn(),
                findAll: jest.fn(),
                delete: jest.fn(),
                update: jest.fn()
            };

            const findMarketUseCase = new FindMarketUseCase(mockMarketRepository);

            mockMarketRepository.findById.mockResolvedValue(null);

            // Act & Assert
            await expect(findMarketUseCase.execute({ id: "invalid-id" })).rejects.toThrow(NotFoundError);
        });
    });

    describe("UpdateMarketUseCase", () => {
        it("deve atualizar nome do mercado", async () => {
            // Arrange
            const mockMarketRepository: jest.Mocked<IMarketRepository> = {
                save: jest.fn(),
                findByName: jest.fn(),
                findById: jest.fn(),
                findAll: jest.fn(),
                delete: jest.fn(),
                update: jest.fn()
            };

            const updateMarketUseCase = new UpdateMarketUseCase(mockMarketRepository);

            const marketProps = {
                id: "123e4567-e89b-12d3-a456-426614174000",
                name: "Supermercado Atualizado"
            };

            const existingMarket = {
                getId: jest.fn().mockReturnValue(marketProps.id),
                getName: jest.fn().mockReturnValue("Nome Antigo"),
                getUserId: jest.fn().mockReturnValue("user-id"),
                updateName: jest.fn().mockReturnThis()
            } as any;

            mockMarketRepository.findById.mockResolvedValue(existingMarket);
            mockMarketRepository.findByName.mockResolvedValue(null);
            mockMarketRepository.save.mockResolvedValue(undefined);

            // Act
            await updateMarketUseCase.execute(marketProps);

            // Assert
            expect(mockMarketRepository.findById).toHaveBeenCalledWith(marketProps.id);
            expect(mockMarketRepository.findByName).toHaveBeenCalledWith(marketProps.name);
            expect(existingMarket.updateName).toHaveBeenCalledWith(marketProps.name);
            expect(mockMarketRepository.save).toHaveBeenCalled();
        });

        it("deve retornar erro quando mercado não é encontrado", async () => {
            // Arrange
            const mockMarketRepository: jest.Mocked<IMarketRepository> = {
                save: jest.fn(),
                findByName: jest.fn(),
                findById: jest.fn(),
                findAll: jest.fn(),
                delete: jest.fn(),
                update: jest.fn()
            };

            const updateMarketUseCase = new UpdateMarketUseCase(mockMarketRepository);

            const marketProps = {
                id: "invalid-id",
                name: "Novo Nome"
            };

            mockMarketRepository.findById.mockResolvedValue(null);

            // Act & Assert
            await expect(updateMarketUseCase.execute(marketProps)).rejects.toThrow(NotFoundError);
        });

        it("deve retornar erro para nome duplicado", async () => {
            // Arrange
            const mockMarketRepository: jest.Mocked<IMarketRepository> = {
                save: jest.fn(),
                findByName: jest.fn(),
                findById: jest.fn(),
                findAll: jest.fn(),
                delete: jest.fn(),
                update: jest.fn()
            };

            const updateMarketUseCase = new UpdateMarketUseCase(mockMarketRepository);

            const marketProps = {
                id: "123e4567-e89b-12d3-a456-426614174000",
                name: "Nome Duplicado"
            };

            const existingMarket = {
                getId: jest.fn().mockReturnValue(marketProps.id),
                getName: jest.fn().mockReturnValue("Nome Antigo"),
                getUserId: jest.fn().mockReturnValue("user-id")
            } as any;

            const duplicateMarket = {
                getId: jest.fn().mockReturnValue("different-id"),
                getName: jest.fn().mockReturnValue(marketProps.name),
                getUserId: jest.fn().mockReturnValue("user-id")
            } as any;

            mockMarketRepository.findById.mockResolvedValue(existingMarket);
            mockMarketRepository.findByName.mockResolvedValue(duplicateMarket);

            // Act & Assert
            await expect(updateMarketUseCase.execute(marketProps)).rejects.toThrow(ConflictError);
        });
    });

    describe("DeleteMarketUseCase", () => {
        it("deve deletar mercado existente", async () => {
            // Arrange
            const mockMarketRepository: jest.Mocked<IMarketRepository> = {
                save: jest.fn(),
                findByName: jest.fn(),
                findById: jest.fn(),
                findAll: jest.fn(),
                delete: jest.fn(),
                update: jest.fn()
            };

            const deleteMarketUseCase = new DeleteMarketUseCase(mockMarketRepository);

            const marketId = "123e4567-e89b-12d3-a456-426614174000";
            const existingMarket = {
                getId: jest.fn().mockReturnValue(marketId),
                getName: jest.fn().mockReturnValue("Supermercado Central"),
                getUserId: jest.fn().mockReturnValue("user-id")
            } as any;

            mockMarketRepository.findById.mockResolvedValue(existingMarket);
            mockMarketRepository.delete.mockResolvedValue(existingMarket);

            // Act
            await deleteMarketUseCase.execute(marketId);

            // Assert
            expect(mockMarketRepository.findById).toHaveBeenCalledWith(marketId);
            expect(mockMarketRepository.delete).toHaveBeenCalledWith(marketId);
        });

        it("deve retornar erro para ID vazio", async () => {
            // Arrange
            const mockMarketRepository: jest.Mocked<IMarketRepository> = {
                save: jest.fn(),
                findByName: jest.fn(),
                findById: jest.fn(),
                findAll: jest.fn(),
                delete: jest.fn(),
                update: jest.fn()
            };

            const deleteMarketUseCase = new DeleteMarketUseCase(mockMarketRepository);

            // Act & Assert
            await expect(deleteMarketUseCase.execute("")).rejects.toThrow(BadRequest);
        });

        it("deve retornar erro quando mercado não é encontrado", async () => {
            // Arrange
            const mockMarketRepository: jest.Mocked<IMarketRepository> = {
                save: jest.fn(),
                findByName: jest.fn(),
                findById: jest.fn(),
                findAll: jest.fn(),
                delete: jest.fn(),
                update: jest.fn()
            };

            const deleteMarketUseCase = new DeleteMarketUseCase(mockMarketRepository);

            mockMarketRepository.findById.mockResolvedValue(null);

            // Act & Assert
            await expect(deleteMarketUseCase.execute("invalid-id")).rejects.toThrow(NotFoundError);
        });
    });
});