import { CreateProductUseCase } from "../../src/product/usecase/CreateProductUseCase";
import { IProductRepository } from "../../src/product/provider/IProductRepository";
import { IUUIDProvider } from "../../src/shared/IUUIDProvider";
import { ValidationError } from "../../src/shared/errors/ValidationError";

describe("Product Use Cases", () => {

    describe("CreateProductUseCase", () => {
        it("deve criar um novo produto", async () => {
            // Arrange
            const mockProductRepository: jest.Mocked<IProductRepository> = {
                save: jest.fn(),
                findById: jest.fn(),
                findByName: jest.fn(),
                delete: jest.fn()
            };

            const mockUUIDProvider: jest.Mocked<IUUIDProvider> = {
                generate: jest.fn()
            };

            const createProductUseCase = new CreateProductUseCase(
                mockProductRepository,
                mockUUIDProvider
            );

            const productProps = {
                name: "Arroz Branco",
                brand: "Tio João",
                listDefault: true,
                userId: "123e4567-e89b-12d3-a456-426614174000"
            };

            const generatedId = "456e7890-e89b-12d3-a456-426614174001";

            mockUUIDProvider.generate.mockReturnValue(generatedId);
            mockProductRepository.save.mockResolvedValue(undefined);

            // Act
            const result = await createProductUseCase.execute(productProps);

            // Assert
            expect(result).toEqual({ productId: generatedId });
            expect(mockUUIDProvider.generate).toHaveBeenCalled();
            expect(mockProductRepository.save).toHaveBeenCalled();
        });

        it("deve criar produto sem listDefault (usando valor padrão false)", async () => {
            // Arrange
            const mockProductRepository: jest.Mocked<IProductRepository> = {
                save: jest.fn(),
                findById: jest.fn(),
                findByName: jest.fn(),
                delete: jest.fn()
            };

            const mockUUIDProvider: jest.Mocked<IUUIDProvider> = {
                generate: jest.fn()
            };

            const createProductUseCase = new CreateProductUseCase(
                mockProductRepository,
                mockUUIDProvider
            );

            const productProps = {
                name: "Feijão Preto",
                brand: "Camil",
                userId: "123e4567-e89b-12d3-a456-426614174000"
            };

            const generatedId = "456e7890-e89b-12d3-a456-426614174002";

            mockUUIDProvider.generate.mockReturnValue(generatedId);
            mockProductRepository.save.mockResolvedValue(undefined);

            // Act
            const result = await createProductUseCase.execute(productProps);

            // Assert
            expect(result).toEqual({ productId: generatedId });
            expect(mockUUIDProvider.generate).toHaveBeenCalled();
            expect(mockProductRepository.save).toHaveBeenCalled();
        });

        it("deve validar nome do produto vazio", async () => {
            // Arrange
            const mockProductRepository: jest.Mocked<IProductRepository> = {
                save: jest.fn(),
                findById: jest.fn(),
                findByName: jest.fn(),
                delete: jest.fn()
            };

            const mockUUIDProvider: jest.Mocked<IUUIDProvider> = {
                generate: jest.fn()
            };

            const createProductUseCase = new CreateProductUseCase(
                mockProductRepository,
                mockUUIDProvider
            );

            const productProps = {
                name: "",
                brand: "Marca Teste",
                userId: "123e4567-e89b-12d3-a456-426614174000"
            };

            // Act & Assert
            await expect(createProductUseCase.execute(productProps)).rejects.toThrow(ValidationError);
            expect(mockProductRepository.save).not.toHaveBeenCalled();
        });

        it("deve validar nome do produto muito curto", async () => {
            // Arrange
            const mockProductRepository: jest.Mocked<IProductRepository> = {
                save: jest.fn(),
                findById: jest.fn(),
                findByName: jest.fn(),
                delete: jest.fn()
            };

            const mockUUIDProvider: jest.Mocked<IUUIDProvider> = {
                generate: jest.fn()
            };

            const createProductUseCase = new CreateProductUseCase(
                mockProductRepository,
                mockUUIDProvider
            );

            const productProps = {
                name: "A",
                brand: "Marca Teste",
                userId: "123e4567-e89b-12d3-a456-426614174000"
            };

            // Act & Assert
            await expect(createProductUseCase.execute(productProps)).rejects.toThrow(ValidationError);
            expect(mockProductRepository.save).not.toHaveBeenCalled();
        });

        it("deve validar marca do produto vazia", async () => {
            // Arrange
            const mockProductRepository: jest.Mocked<IProductRepository> = {
                save: jest.fn(),
                findById: jest.fn(),
                findByName: jest.fn(),
                delete: jest.fn()
            };

            const mockUUIDProvider: jest.Mocked<IUUIDProvider> = {
                generate: jest.fn()
            };

            const createProductUseCase = new CreateProductUseCase(
                mockProductRepository,
                mockUUIDProvider
            );

            const productProps = {
                name: "Produto Teste",
                brand: "",
                userId: "123e4567-e89b-12d3-a456-426614174000"
            };

            // Act & Assert
            await expect(createProductUseCase.execute(productProps)).rejects.toThrow(ValidationError);
            expect(mockProductRepository.save).not.toHaveBeenCalled();
        });

        it("deve remover espaços extras do nome e marca", async () => {
            // Arrange
            const mockProductRepository: jest.Mocked<IProductRepository> = {
                save: jest.fn(),
                findById: jest.fn(),
                findByName: jest.fn(),
                delete: jest.fn()
            };

            const mockUUIDProvider: jest.Mocked<IUUIDProvider> = {
                generate: jest.fn()
            };

            const createProductUseCase = new CreateProductUseCase(
                mockProductRepository,
                mockUUIDProvider
            );

            const productProps = {
                name: "  Arroz Branco  ",
                brand: "  Tio João  ",
                userId: "123e4567-e89b-12d3-a456-426614174000"
            };

            const generatedId = "456e7890-e89b-12d3-a456-426614174003";

            mockUUIDProvider.generate.mockReturnValue(generatedId);
            mockProductRepository.save.mockResolvedValue(undefined);

            // Act
            const result = await createProductUseCase.execute(productProps);

            // Assert
            expect(result).toEqual({ productId: generatedId });
            expect(mockUUIDProvider.generate).toHaveBeenCalled();
            expect(mockProductRepository.save).toHaveBeenCalled();
        });
    });
});