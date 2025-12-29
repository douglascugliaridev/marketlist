import { Market } from "../../src/market/model/market.entity";


describe("Market Entity - Validação de Criação", () => {
    it("Criação com dados válidos", () => {
        const market = Market.create({
            id: "c2a6f8b3-4c0d-4e9b-9f2e-7a1d5b6c8e90",
            name: "Supermercado Exemplo",
            userId: "7f3b7c8e-9c6d-4a4f-9b91-5a6c2f1e3d84"
        });
        expect(market.getId()).toBe("c2a6f8b3-4c0d-4e9b-9f2e-7a1d5b6c8e90");
        expect(market.getName()).toBe("Supermercado Exemplo");
        expect(market.getUserId()).toBe("7f3b7c8e-9c6d-4a4f-9b91-5a6c2f1e3d84");
    });

    it("Criação com ID inválido", () => {
        expect(() => {
            Market.create({
                id: "invalid-uuid",
                name: "Supermercado Exemplo",
                userId: "7f3b7c8e-9c6d-4a4f-9b91-5a6c2f1e3d84"
            });
        }).toThrow("ID do mercado inválido");
    });

    it("Criação com ID vazio", () => {
        expect(() => {
            Market.create({
                id: "",
                name: "Supermercado Exemplo",
                userId: "7f3b7c8e-9c6d-4a4f-9b91-5a6c2f1e3d84"
            });
        }).toThrow("ID do mercado é obrigatório");
    });

    it("Criação com nome inválido", () => {
        expect(() => {
            Market.create({
                id: "c2a6f8b3-4c0d-4e9b-9f2e-7a1d5b6c8e90",
                name: "",
                userId: "7f3b7c8e-9c6d-4a4f-9b91-5a6c2f1e3d84"
            });
        }).toThrow("Nome do mercado é obrigatório");
    });

    it("Criação com nome muito curto", () => {
        expect(() => {
            Market.create({
                id: "c2a6f8b3-4c0d-4e9b-9f2e-7a1d5b6c8e90",
                name: "A",
                userId: "7f3b7c8e-9c6d-4a4f-9b91-5a6c2f1e3d84"
            });
        }).toThrow("Nome do mercado deve ter pelo menos 2 caracteres");
    });

    it("Criação com nome muito longo", () => {
        expect(() => {
            Market.create({
                id: "c2a6f8b3-4c0d-4e9b-9f2e-7a1d5b6c8e90",
                name: "A".repeat(101),
                userId: "7f3b7c8e-9c6d-4a4f-9b91-5a6c2f1e3d84"
            });
        }).toThrow("Nome do mercado deve ter no máximo 100 caracteres");
    });

    it("Criação com userId inválido", () => {
        expect(() => {
            Market.create({
                id: "c2a6f8b3-4c0d-4e9b-9f2e-7a1d5b6c8e90",
                name: "Supermercado Exemplo",
                userId: ""
            });
        }).toThrow("ID do usuário é obrigatório");
    });

    it("Criação com userId em formato UUID inválido", () => {
        expect(() => {
            Market.create({
                id: "c2a6f8b3-4c0d-4e9b-9f2e-7a1d5b6c8e90",
                name: "Supermercado Exemplo",
                userId: "invalid-uuid"
            });
        }).toThrow("Formato de UUID do usuário inválido");
    });

    it("Criação com userId null", () => {
        expect(() => {
            Market.create({
                id: "c2a6f8b3-4c0d-4e9b-9f2e-7a1d5b6c8e90",
                name: "Supermercado Exemplo",
                userId: null as any
            });
        }).toThrow("ID do usuário é obrigatório");
    });

    it("Criação com userId undefined", () => {
        expect(() => {
            Market.create({
                id: "c2a6f8b3-4c0d-4e9b-9f2e-7a1d5b6c8e90",
                name: "Supermercado Exemplo",
                userId: undefined as any
            });
        }).toThrow("ID do usuário é obrigatório");
    });
});

describe("Market Entity - Atualização de Nome", () => {
    it("Atualização com nome válido", () => {
        const market = Market.create({
            id: "c2a6f8b3-4c0d-4e9b-9f2e-7a1d5b6c8e90",
            name: "Supermercado Exemplo",
            userId: "7f3b7c8e-9c6d-4a4f-9b91-5a6c2f1e3d84"
        });

        const updatedMarket = market.updateName("Hipermercado Exemplo");
        expect(updatedMarket.getName()).toBe("Hipermercado Exemplo");
        expect(updatedMarket.getId()).toBe("c2a6f8b3-4c0d-4e9b-9f2e-7a1d5b6c8e90");
        expect(updatedMarket.getUserId()).toBe("7f3b7c8e-9c6d-4a4f-9b91-5a6c2f1e3d84");
    });

    it("Atualização com nome inválido", () => {
        const market = Market.create({
            id: "c2a6f8b3-4c0d-4e9b-9f2e-7a1d5b6c8e90",
            name: "Supermercado Exemplo",
            userId: "7f3b7c8e-9c6d-4a4f-9b91-5a6c2f1e3d84"
        });

        expect(() => {
            market.updateName("");
        }).toThrow("Nome do mercado é obrigatório");
    });

    it("Atualização com nome muito curto", () => {
        const market = Market.create({
            id: "c2a6f8b3-4c0d-4e9b-9f2e-7a1d5b6c8e90",
            name: "Supermercado Exemplo",
            userId: "7f3b7c8e-9c6d-4a4f-9b91-5a6c2f1e3d84"
        });

        expect(() => {
            market.updateName("A");
        }).toThrow("Nome do mercado deve ter pelo menos 2 caracteres");
    });

    it("Atualização com nome muito longo", () => {
        const market = Market.create({
            id: "c2a6f8b3-4c0d-4e9b-9f2e-7a1d5b6c8e90",
            name: "Supermercado Exemplo",
            userId: "7f3b7c8e-9c6d-4a4f-9b91-5a6c2f1e3d84"
        });

        expect(() => {
            market.updateName("A".repeat(101));
        }).toThrow("Nome do mercado deve ter no máximo 100 caracteres");
    });

    it("Atualização com nome contendo apenas espaços", () => {
        const market = Market.create({
            id: "c2a6f8b3-4c0d-4e9b-9f2e-7a1d5b6c8e90",
            name: "Supermercado Exemplo",
            userId: "7f3b7c8e-9c6d-4a4f-9b91-5a6c2f1e3d84"
        });

        expect(() => {
            market.updateName("   ");
        }).toThrow("Nome do mercado deve ter pelo menos 2 caracteres");
    });

    it("Atualização com nome null", () => {
        const market = Market.create({
            id: "c2a6f8b3-4c0d-4e9b-9f2e-7a1d5b6c8e90",
            name: "Supermercado Exemplo",
            userId: "7f3b7c8e-9c6d-4a4f-9b91-5a6c2f1e3d84"
        });

        expect(() => {
            market.updateName(null as any);
        }).toThrow("Nome do mercado é obrigatório");
    });

    it("Atualização com nome undefined", () => {
        const market = Market.create({
            id: "c2a6f8b3-4c0d-4e9b-9f2e-7a1d5b6c8e90",
            name: "Supermercado Exemplo",
            userId: "7f3b7c8e-9c6d-4a4f-9b91-5a6c2f1e3d84"
        });

        expect(() => {
            market.updateName(undefined as any);
        }).toThrow("Nome do mercado é obrigatório");
    });
});

describe("Market Entity - Imutabilidade", () => {
    it("updateName retorna nova instância sem modificar original", () => {
        const originalMarket = Market.create({
            id: "c2a6f8b3-4c0d-4e9b-9f2e-7a1d5b6c8e90",
            name: "Supermercado Original",
            userId: "7f3b7c8e-9c6d-4a4f-9b91-5a6c2f1e3d84"
        });

        const updatedMarket = originalMarket.updateName("Supermercado Atualizado");

        expect(originalMarket.getName()).toBe("Supermercado Original");
        expect(updatedMarket.getName()).toBe("Supermercado Atualizado");
        expect(originalMarket.getId()).toBe(updatedMarket.getId());
        expect(originalMarket.getUserId()).toBe(updatedMarket.getUserId());
        expect(originalMarket).not.toBe(updatedMarket);
    });

    it("Múltiplas atualizações criam instâncias diferentes", () => {
        const market1 = Market.create({
            id: "c2a6f8b3-4c0d-4e9b-9f2e-7a1d5b6c8e90",
            name: "Nome 1",
            userId: "7f3b7c8e-9c6d-4a4f-9b91-5a6c2f1e3d84"
        });

        const market2 = market1.updateName("Nome 2");
        const market3 = market2.updateName("Nome 3");

        expect(market1.getName()).toBe("Nome 1");
        expect(market2.getName()).toBe("Nome 2");
        expect(market3.getName()).toBe("Nome 3");
        expect(market1).not.toBe(market2);
        expect(market2).not.toBe(market3);
        expect(market1).not.toBe(market3);
    });
});

describe("Market Entity - Comparações e Normalização", () => {
    it("Comparação de nomes case-insensitive", () => {
        const market = Market.create({
            id: "c2a6f8b3-4c0d-4e9b-9f2e-7a1d5b6c8e90",
            name: "Supermercado Exemplo",
            userId: "7f3b7c8e-9c6d-4a4f-9b91-5a6c2f1e3d84"
        });

        expect(market.hasSameName("supermercado exemplo")).toBe(true);
        expect(market.hasSameName("SUPERMERCADO EXEMPLO")).toBe(true);
        expect(market.hasSameName("Supermercado Exemplo")).toBe(true);
        expect(market.hasSameName("Outro Mercado")).toBe(false);
    });

    it("Valor normalizado", () => {
        const market = Market.create({
            id: "c2a6f8b3-4c0d-4e9b-9f2e-7a1d5b6c8e90",
            name: "Supermercado Exemplo",
            userId: "7f3b7c8e-9c6d-4a4f-9b91-5a6c2f1e3d84"
        });

        expect(market.getNameForComparison()).toBe("supermercado exemplo");
    });

    it("Igualdade de nomes", () => {
        const market1 = Market.create({
            id: "c2a6f8b3-4c0d-4e9b-9f2e-7a1d5b6c8e90",
            name: "Supermercado Exemplo",
            userId: "7f3b7c8e-9c6d-4a4f-9b91-5a6c2f1e3d84"
        });

        const market2 = Market.create({
            id: "c2a6f8b3-4c0d-4e9b-9f2e-7a1d5b6c8e91",
            name: "SUPERMERCADO EXEMPLO",
            userId: "7f3b7c8e-9c6d-4a4f-9b91-5a6c2f1e3d84"
        });

        expect(market1.hasSameName(market2.getName())).toBe(true);
    });
});


describe("Market Entity - Edge Cases", () => {
    it("Nomes com espaços", () => {
        const market = Market.create({
            id: "c2a6f8b3-4c0d-4e9b-9f2e-7a1d5b6c8e90",
            name: "  Supermercado Exemplo  ",
            userId: "7f3b7c8e-9c6d-4a4f-9b91-5a6c2f1e3d84"
        });

        expect(market.getName()).toBe("Supermercado Exemplo");
        expect(market.getNameForComparison()).toBe("supermercado exemplo");
    });

    it("Nomes com caracteres especiais", () => {
        const market = Market.create({
            id: "c2a6f8b3-4c0d-4e9b-9f2e-7a1d5b6c8e90",
            name: "Supermercado & Exemplo's",
            userId: "7f3b7c8e-9c6d-4a4f-9b91-5a6c2f1e3d84"
        });

        expect(market.getName()).toBe("Supermercado & Exemplo's");
        expect(market.getNameForComparison()).toBe("supermercado & exemplo's");
    });

    it("Nomes com caracteres unicode e acentos", () => {
        const market = Market.create({
            id: "c2a6f8b3-4c0d-4e9b-9f2e-7a1d5b6c8e90",
            name: "Supermercado São João & Árvore",
            userId: "7f3b7c8e-9c6d-4a4f-9b91-5a6c2f1e3d84"
        });

        expect(market.getName()).toBe("Supermercado São João & Árvore");
        expect(market.getNameForComparison()).toBe("supermercado são joão & árvore");
    });

    it("Nomes com múltiplos espaços entre palavras", () => {
        const market = Market.create({
            id: "c2a6f8b3-4c0d-4e9b-9f2e-7a1d5b6c8e90",
            name: "Supermercado    Exemplo    Teste",
            userId: "7f3b7c8e-9c6d-4a4f-9b91-5a6c2f1e3d84"
        });

        expect(market.getName()).toBe("Supermercado    Exemplo    Teste");
        expect(market.getNameForComparison()).toBe("supermercado    exemplo    teste");
    });

    it("Comparação de nomes com espaços extras no parâmetro", () => {
        const market = Market.create({
            id: "c2a6f8b3-4c0d-4e9b-9f2e-7a1d5b6c8e90",
            name: "Supermercado Exemplo",
            userId: "7f3b7c8e-9c6d-4a4f-9b91-5a6c2f1e3d84"
        });

        expect(market.hasSameName("  supermercado exemplo  ")).toBe(true);
        expect(market.hasSameName("\tsupermercado exemplo\n")).toBe(true);
    });

    it("Nomes com tabs e newlines", () => {
        const market = Market.create({
            id: "c2a6f8b3-4c0d-4e9b-9f2e-7a1d5b6c8e90",
            name: "Supermercado\tExemplo\nTeste",
            userId: "7f3b7c8e-9c6d-4a4f-9b91-5a6c2f1e3d84"
        });

        expect(market.getName()).toBe("Supermercado\tExemplo\nTeste");
        expect(market.getNameForComparison()).toBe("supermercado\texemplo\nteste");
    });

});

describe("Market Entity - Limites Exatos", () => {
    it("Nome com exatamente 2 caracteres", () => {
        const market = Market.create({
            id: "c2a6f8b3-4c0d-4e9b-9f2e-7a1d5b6c8e90",
            name: "AB",
            userId: "7f3b7c8e-9c6d-4a4f-9b91-5a6c2f1e3d84"
        });

        expect(market.getName()).toBe("AB");
        expect(market.getNameForComparison()).toBe("ab");
    });

    it("Nome com exatamente 100 caracteres", () => {
        const name100 = "A".repeat(100);
        const market = Market.create({
            id: "c2a6f8b3-4c0d-4e9b-9f2e-7a1d5b6c8e90",
            name: name100,
            userId: "7f3b7c8e-9c6d-4a4f-9b91-5a6c2f1e3d84"
        });

        expect(market.getName()).toBe(name100);
        expect(market.getNameForComparison()).toBe(name100.toLowerCase());
    });

    it("UUID com diferentes versões válidas", () => {
        const validUUIDs = [
            "123e4567-e89b-12d3-a456-426614174000", // UUID v1
            "123e4567-e89b-22d3-a456-426614174000", // UUID v2
            "123e4567-e89b-32d3-a456-426614174000", // UUID v3
            "123e4567-e89b-42d3-a456-426614174000", // UUID v4
            "123e4567-e89b-52d3-a456-426614174000"  // UUID v5
        ];

        validUUIDs.forEach((uuid, index) => {
            const market = Market.create({
                id: uuid,
                name: `Supermercado Teste ${index + 1}`,
                userId: "7f3b7c8e-9c6d-4a4f-9b91-5a6c2f1e3d84"
            });

            expect(market.getId()).toBe(uuid);
        });
    });
});

describe("Market Entity - Tipos Incorretos", () => {
    it("Criação com name como number", () => {
        expect(() => {
            Market.create({
                id: "c2a6f8b3-4c0d-4e9b-9f2e-7a1d5b6c8e90",
                name: 123456 as any,
                userId: "7f3b7c8e-9c6d-4a4f-9b91-5a6c2f1e3d84"
            });
        }).toThrow("Nome do mercado é obrigatório");
    });

    it("Criação com userId como number", () => {
        expect(() => {
            Market.create({
                id: "c2a6f8b3-4c0d-4e9b-9f2e-7a1d5b6c8e90",
                name: "Supermercado Exemplo",
                userId: 123456 as any
            });
        }).toThrow("ID do usuário é obrigatório");
    });
});


