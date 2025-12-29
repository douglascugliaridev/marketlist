import { Product } from "../../src/product/model/product.entity";
import { ProductId } from "../../src/product/model/value-objects/ProductId";
import { ProductName } from "../../src/product/model/value-objects/ProductName";
import { ProductBrand } from "../../src/product/model/value-objects/ProductBrand";
import { UserId } from "../../src/users/model/value-objects/UserId";

describe("Product Entity", () => {
    it("deve criar um produto válido", () => {
        const productId = ProductId.create("3f2c8b6e-9a4f-4c8a-bb41-2f6f6a1e9d72");
        const productName = ProductName.create("Arroz");
        const userId = UserId.create("7f3b7c8e-9c6d-4a4f-9b91-5a6c2f1e3d84");
        const product = new Product(productId, productName, "Marca A", false, userId);

        expect(product.getId()).toBe("3f2c8b6e-9a4f-4c8a-bb41-2f6f6a1e9d72");
        expect(product.getName()).toBe("Arroz");
        expect(product.getBrand()).toBe("Marca A");
        expect(product.isListDefault()).toBe(false);
        expect(product.getUserId()).toBe("7f3b7c8e-9c6d-4a4f-9b91-5a6c2f1e3d84");
    });

    it("deve ter métodos getters para todos os campos", () => {
        const productId = ProductId.create("3f2c8b6e-9a4f-4c8a-bb41-2f6f6a1e9d72");
        const productName = ProductName.create("Arroz");
        const userId = UserId.create("7f3b7c8e-9c6d-4a4f-9b91-5a6c2f1e3d84");
        const product = new Product(productId, productName, "Marca A", false, userId);

        expect(product.getId()).toBeDefined();
        expect(product.getName()).toBeDefined();
        expect(product.getBrand()).toBeDefined();
        expect(product.isListDefault()).toBeDefined();
        expect(product.getUserId()).toBeDefined();
    });

    it("deve criar um produto com item para lista padrão", () => {
        const productId = ProductId.create("3f2c8b6e-9a4f-4c8a-bb41-2f6f6a1e9d72");
        const productName = ProductName.create("Feijão");
        const userId = UserId.create("7f3b7c8e-9c6d-4a4f-9b91-5a6c2f1e3d84");
        const product = new Product(productId, productName, "Marca B", true, userId);

        expect(product.getId()).toBe("3f2c8b6e-9a4f-4c8a-bb41-2f6f6a1e9d72");
        expect(product.getName()).toBe("Feijão");
        expect(product.getBrand()).toBe("Marca B");
        expect(product.isListDefault()).toBe(true);
        expect(product.getUserId()).toBe("7f3b7c8e-9c6d-4a4f-9b91-5a6c2f1e3d84");
    });

    it("não deve criar um produto com marca vazia", () => {
        const productId = ProductId.create("3f2c8b6e-9a4f-4c8a-bb41-2f6f6a1e9d72");
        const productName = ProductName.create("Arroz");
        const userId = UserId.create("7f3b7c8e-9c6d-4a4f-9b91-5a6c2f1e3d84");

        expect(() => {
            new Product(productId, productName, ProductBrand.create("").getValue(), false, userId);
        }).toThrow("Marca do produto é obrigatória");
    });

    it("deve criar produto com espaços na marca (trim)", () => {
        const productId = ProductId.create("3f2c8b6e-9a4f-4c8a-bb41-2f6f6a1e9d72");
        const productName = ProductName.create("Arroz");
        const userId = UserId.create("7f3b7c8e-9c6d-4a4f-9b91-5a6c2f1e3d84");
        const product = new Product(productId, productName, ProductBrand.create("  Marca A  ").getValue(), false, userId);

        expect(product.getBrand()).toBe("Marca A");
    });

    it("deve criar produto com espaços no nome (trim)", () => {
        const productId = ProductId.create("3f2c8b6e-9a4f-4c8a-bb41-2f6f6a1e9d72");
        const productName = ProductName.create("  Arroz  ");
        const userId = UserId.create("7f3b7c8e-9c6d-4a4f-9b91-5a6c2f1e3d84");
        const product = new Product(productId, productName, "Marca A", false, userId);

        expect(product.getName()).toBe("Arroz");
    });

    it("deve criar produto usando ProductBrand value object", () => {
        const productId = ProductId.create("3f2c8b6e-9a4f-4c8a-bb41-2f6f6a1e9d72");
        const productName = ProductName.create("Arroz");
        const productBrand = ProductBrand.create("Marca A");
        const userId = UserId.create("7f3b7c8e-9c6d-4a4f-9b91-5a6c2f1e3d84");
        const product = new Product(productId, productName, productBrand.getValue(), false, userId);

        expect(product.getBrand()).toBe("Marca A");
    });
});

describe("Product Entity - Value Objects", () => {
    it("deve validar UUID do produto", () => {
        const productName = ProductName.create("Arroz");
        const userId = UserId.create("7f3b7c8e-9c6d-4a4f-9b91-5a6c2f1e3d84");

        expect(() => {
            new Product(ProductId.create("invalid-uuid"), productName, "Marca A", false, userId);
        }).toThrow("ID do produto inválido");
    });

    it("deve validar UUID do usuário", () => {
        const productId = ProductId.create("3f2c8b6e-9a4f-4c8a-bb41-2f6f6a1e9d72");
        const productName = ProductName.create("Arroz");

        expect(() => {
            new Product(productId, productName, "Marca A", false, UserId.create("invalid-uuid"));
        }).toThrow("Formato de UUID do usuário inválido");
    });

    it("não deve criar um produto com UUID vázio", () => {
        expect(() => {
            ProductId.create("");
        }).toThrow("ID do produto é obrigatório");
    });

    it("não deve criar um produto com UUID nulo", () => {
        expect(() => {
            ProductId.create(null as any);
        }).toThrow("ID do produto é obrigatório");
    });

    it("não deve criar um produto com UUID undefined", () => {
        expect(() => {
            ProductId.create(undefined as any);
        }).toThrow("ID do produto é obrigatório");
    });


    it("deve validar nome do produto", () => {
        expect(() => {
            ProductName.create("");
        }).toThrow("Nome do produto é obrigatório");
    });

    it("deve validar nome do produto com espaços em branco", () => {
        expect(() => {
            ProductName.create("   ");
        }).toThrow("Nome do produto é obrigatório");
    });

    it("deve validar nome do produto com comprimento máximo", () => {
        const longName = "a".repeat(101); // 101 caracteres
        expect(() => {
            ProductName.create(longName);
        }).toThrow("Nome do produto deve ter no máximo 100 caracteres");
    });

    it("deve validar nome do produto com comprimento mínimo", () => {
        expect(() => {
            ProductName.create("a"); // 1 caractere
        }).toThrow("Nome do produto deve ter pelo menos 2 caracteres");
    });
});

describe("ProductBrand Value Object", () => {
    it("deve criar uma marca válida", () => {
        const brand = ProductBrand.create("Marca A");
        expect(brand.getValue()).toBe("Marca A");
    });

    it("deve fazer trim da marca", () => {
        const brand = ProductBrand.create("  Marca A  ");
        expect(brand.getValue()).toBe("Marca A");
    });

    it("não deve criar marca vazia", () => {
        expect(() => {
            ProductBrand.create("");
        }).toThrow("Marca do produto é obrigatória");
    });

    it("não deve criar marca com apenas espaços", () => {
        expect(() => {
            ProductBrand.create("   ");
        }).toThrow("Marca do produto é obrigatória");
    });

    it("não deve criar marca null", () => {
        expect(() => {
            ProductBrand.create(null as any);
        }).toThrow("Marca do produto é obrigatória");
    });

    it("não deve criar marca undefined", () => {
        expect(() => {
            ProductBrand.create(undefined as any);
        }).toThrow("Marca do produto é obrigatória");
    });

    it("não deve criar marca com mais de 50 caracteres", () => {
        const longBrand = "a".repeat(51);
        expect(() => {
            ProductBrand.create(longBrand);
        }).toThrow("Marca do produto deve ter no máximo 50 caracteres");
    });

    it("deve criar marca com limite exato de 50 caracteres", () => {
        const exactBrand = "a".repeat(50);
        const brand = ProductBrand.create(exactBrand);
        expect(brand.getValue()).toBe(exactBrand);
    });

    it("deve comparar marcas iguais", () => {
        const brand1 = ProductBrand.create("Marca A");
        const brand2 = ProductBrand.create("Marca A");
        expect(brand1.equals(brand2)).toBe(true);
    });

    it("deve comparar marcas diferentes", () => {
        const brand1 = ProductBrand.create("Marca A");
        const brand2 = ProductBrand.create("Marca B");
        expect(brand1.equals(brand2)).toBe(false);
    });
});

describe("Edge Cases e Limites", () => {
    it("deve criar nome com limite exato de 2 caracteres", () => {
        const name = ProductName.create("AB");
        expect(name.getValue()).toBe("AB");
    });

    it("deve criar nome com limite exato de 100 caracteres", () => {
        const longName = "a".repeat(100);
        const name = ProductName.create(longName);
        expect(name.getValue()).toBe(longName);
    });

    it("não deve criar UserId com tipo não-string", () => {
        expect(() => {
            UserId.create(123 as any);
        }).toThrow("ID do usuário é obrigatório");

        expect(() => {
            UserId.create({} as any);
        }).toThrow("ID do usuário é obrigatório");
    });

    it("deve fazer trim em UserId", () => {
        const userId = UserId.create("  7f3b7c8e-9c6d-4a4f-9b91-5a6c2f1e3d84  ");
        expect(userId.getValue()).toBe("7f3b7c8e-9c6d-4a4f-9b91-5a6c2f1e3d84");
    });

    it("deve fazer trim em ProductId", () => {
        const productId = ProductId.create("  3f2c8b6e-9a4f-4c8a-bb41-2f6f6a1e9d72  ");
        expect(productId.getValue()).toBe("3f2c8b6e-9a4f-4c8a-bb41-2f6f6a1e9d72");
    });
});
