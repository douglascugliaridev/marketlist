import { User } from "../../src/users/model/user.entity";

describe("User Entity - Criação e Getters", () => {
    it("deve criar um usuário com dados válidos e retornar valores corretos", () => {
        const user = User.create({
            id: "123e4567-e89b-12d3-a456-426614174000",
            name: "João Silva",
            email: "joao.silva@example.com"
        });

        expect(user.getId()).toBe("123e4567-e89b-12d3-a456-426614174000");
        expect(user.getName()).toBe("João Silva");
        expect(user.getEmail()).toBe("joao.silva@example.com");
    });

    it("deve manter imutabilidade do ID após criação", () => {
        const user = User.create({
            id: "123e4567-e89b-12d3-a456-426614174000",
            name: "Carlos Oliveira",
            email: "carlos.oliveira@example.com"
        });

        expect(user.getId()).toBe("123e4567-e89b-12d3-a456-426614174000");
    });
});

describe("User Entity - Validação de ID", () => {
    it("deve validar formato UUID do ID", () => {
        const validUuid = "123e4567-e89b-12d3-a456-426614174000";
        const user = User.create({
            id: validUuid,
            name: "Test User",
            email: "test@example.com"
        });

        expect(user.getId()).toBe(validUuid);
    });

    it("deve validar formato UUID inválido", () => {
        const invalidUuid = "not-a-uuid";

        expect(() => {
            User.create({
                id: invalidUuid,
                name: "Test User",
                email: "test@example.com"
            });
        }).toThrow("Formato de UUID do usuário inválido");
    });

    it("deve validar UUID com versão inválida", () => {
        const invalidVersionUuid = "123e4567-e89b-62d3-a456-426614174000"; // versão 6 não existe

        expect(() => {
            User.create({
                id: invalidVersionUuid,
                name: "Test User",
                email: "test@example.com"
            });
        }).toThrow("Formato de UUID do usuário inválido");
    });

    it("deve validar UUID com caracteres inválidos", () => {
        const invalidCharUuid = "123z4567-e89b-12d3-a456-426614174000"; // 'z' não é válido em UUID

        expect(() => {
            User.create({
                id: invalidCharUuid,
                name: "Test User",
                email: "test@example.com"
            });
        }).toThrow("Formato de UUID do usuário inválido");
    });

    it("deve validar ID nulo", () => {
        expect(() => {
            User.create({
                id: null as any,
                name: "Test User",
                email: "test@example.com"
            });
        }).toThrow("ID do usuário é obrigatório");
    });

    it("deve validar ID vazio", () => {
        expect(() => {
            User.create({
                id: "",
                name: "Test User",
                email: "test@example.com"
            });
        }).toThrow("ID do usuário é obrigatório");
    });

    it("deve validar tipo inválido (number)", () => {
        expect(() => {
            User.create({
                id: 123 as any,
                name: "Test User",
                email: "test@example.com"
            });
        }).toThrow("ID do usuário é obrigatório");
    });

    it("deve validar tipo inválido (boolean)", () => {
        expect(() => {
            User.create({
                id: true as any,
                name: "Test User",
                email: "test@example.com"
            });
        }).toThrow("ID do usuário é obrigatório");
    });
});

describe("User Entity - Validação de Nome", () => {
    it("deve validar nome nulo", () => {
        expect(() => {
            User.create({
                id: "123e4567-e89b-12d3-a456-426614174000",
                name: null as any,
                email: "test@example.com"
            });
        }).toThrow("Nome do usuário é obrigatório");
    });

    it("deve validar nome vazio", () => {
        expect(() => {
            User.create({
                id: "123e4567-e89b-12d3-a456-426614174000",
                name: "",
                email: "test@example.com"
            });
        }).toThrow("Nome do usuário é obrigatório");
    });

    it("deve validar nome com menos de 3 caracteres", () => {
        expect(() => {
            User.create({
                id: "123e4567-e89b-12d3-a456-426614174000",
                name: "Jo",
                email: "test@example.com"
            });
        }).toThrow("Nome do usuário deve ter pelo menos 3 caracteres");
    });

    it("deve validar nome com exatamente 3 caracteres (limite mínimo)", () => {
        const user = User.create({
            id: "123e4567-e89b-12d3-a456-426614174000",
            name: "Ana",
            email: "ana@example.com"
        });
        expect(user.getName()).toBe("Ana");
    });

    it("deve validar nome com mais de 100 caracteres", () => {
        const longName = "a".repeat(101);
        expect(() => {
            User.create({
                id: "123e4567-e89b-12d3-a456-426614174000",
                name: longName,
                email: "test@example.com"
            });
        }).toThrow("Nome do usuário deve ter no máximo 100 caracteres");
    });

    it("deve validar nome com exatamente 100 caracteres (limite máximo)", () => {
        const validName = "a".repeat(100);
        const user = User.create({
            id: "123e4567-e89b-12d3-a456-426614174000",
            name: validName,
            email: "test@example.com"
        });
        expect(user.getName()).toBe(validName);
    });

    it("deve remover espaços extras do nome", () => {
        const user = User.create({
            id: "123e4567-e89b-12d3-a456-426614174000",
            name: "  João Silva  ",
            email: "joao@example.com"
        });
        expect(user.getName()).toBe("João Silva");
    });

    it("deve validar tipo inválido (number)", () => {
        expect(() => {
            User.create({
                id: "123e4567-e89b-12d3-a456-426614174000",
                name: 123 as any,
                email: "test@example.com"
            });
        }).toThrow("Nome do usuário é obrigatório");
    });

    it("deve validar tipo inválido (boolean)", () => {
        expect(() => {
            User.create({
                id: "123e4567-e89b-12d3-a456-426614174000",
                name: true as any,
                email: "test@example.com"
            });
        }).toThrow("Nome do usuário é obrigatório");
    });
});

describe("User Entity - Validação de Email", () => {
    it("deve validar formato de email válido", () => {
        const user = User.create({
            id: "123e4567-e89b-12d3-a456-426614174000",
            name: "Test User",
            email: "test@example.com"
        });
        expect(user.getEmail()).toBe("test@example.com");
    });

    it("deve validar email nulo", () => {
        expect(() => {
            User.create({
                id: "123e4567-e89b-12d3-a456-426614174000",
                name: "Test User",
                email: null as any
            });
        }).toThrow("Email do usuário é obrigatório");
    });

    it("deve validar email vazio", () => {
        expect(() => {
            User.create({
                id: "123e4567-e89b-12d3-a456-426614174000",
                name: "Test User",
                email: ""
            });
        }).toThrow("Email do usuário é obrigatório");
    });

    it("deve validar formato de email inválido", () => {
        expect(() => {
            User.create({
                id: "123e4567-e89b-12d3-a456-426614174000",
                name: "Test User",
                email: "invalid-email"
            });
        }).toThrow("Formato de email do usuário inválido");
    });

    it("deve validar email sem @", () => {
        expect(() => {
            User.create({
                id: "123e4567-e89b-12d3-a456-426614174000",
                name: "Test User",
                email: "testexample.com"
            });
        }).toThrow("Formato de email do usuário inválido");
    });

    it("deve validar email sem domínio", () => {
        expect(() => {
            User.create({
                id: "123e4567-e89b-12d3-a456-426614174000",
                name: "Test User",
                email: "test@"
            });
        }).toThrow("Formato de email do usuário inválido");
    });

    it("deve validar email com espaços extras", () => {
        const user = User.create({
            id: "123e4567-e89b-12d3-a456-426614174000",
            name: "Test User",
            email: "  test@example.com  "
        });
        expect(user.getEmail()).toBe("test@example.com");
    });

    it("deve converter email para lowercase", () => {
        const user = User.create({
            id: "123e4567-e89b-12d3-a456-426614174000",
            name: "Test User",
            email: "TEST@EXAMPLE.COM"
        });
        expect(user.getEmail()).toBe("test@example.com");
    });

    it("deve manter email com caracteres especiais válidos", () => {
        const user = User.create({
            id: "123e4567-e89b-12d3-a456-426614174000",
            name: "Test User",
            email: "user.name+tag@example.co.uk"
        });
        expect(user.getEmail()).toBe("user.name+tag@example.co.uk");
    });

    it("deve validar tipo inválido (number)", () => {
        expect(() => {
            User.create({
                id: "123e4567-e89b-12d3-a456-426614174000",
                name: "Test User",
                email: 123 as any
            });
        }).toThrow("Email do usuário é obrigatório");
    });

    it("deve validar tipo inválido (boolean)", () => {
        expect(() => {
            User.create({
                id: "123e4567-e89b-12d3-a456-426614174000",
                name: "Test User",
                email: true as any
            });
        }).toThrow("Email do usuário é obrigatório");
    });
});

describe("User - Comportamento", () => {
    it("deve manter encapsulamento dos dados internos", () => {
        const user = User.create({
            id: "123e4567-e89b-12d3-a456-426614174000",
            name: "Test User",
            email: "test@example.com"
        });

        // API pública funciona
        expect(user.getId()).toBe("123e4567-e89b-12d3-a456-426614174000");
        expect(user.getName()).toBe("Test User");
        expect(user.getEmail()).toBe("test@example.com");

        // Estado interno não deve ser usado diretamente (teste documental)
        expect((user as any).id).toBeDefined();
        expect((user as any).name).toBeDefined();
        expect((user as any).email).toBeDefined();
    });
});

describe("User - Integração", () => {
    it("deve criar múltiplos usuários independentes e permitir comparação", () => {
        const user1 = User.create({
            id: "123e4567-e89b-12d3-a456-426614174000",
            name: "User 1",
            email: "user1@example.com"
        });

        const user2 = User.create({
            id: "123e4567-e89b-12d3-a456-426614174001",
            name: "User 2",
            email: "user2@example.com"
        });

        // Verifica que são instâncias diferentes
        expect(user1).not.toBe(user2);

        // Verifica que têm valores diferentes
        expect(user1.getId()).not.toEqual(user2.getId());
        expect(user1.getName()).not.toEqual(user2.getName());
        expect(user1.getEmail()).not.toEqual(user2.getEmail());
    });

    it("deve criar usuários com mesmo ID mas dados diferentes", () => {
        const user1 = User.create({
            id: "123e4567-e89b-12d3-a456-426614174000",
            name: "User 1",
            email: "user1@example.com"
        });

        const user2 = User.create({
            id: "123e4567-e89b-12d3-a456-426614174000",
            name: "User 2",
            email: "user2@example.com"
        });

        // Mesmo ID mas dados diferentes
        expect(user1.getId()).toEqual(user2.getId());
        expect(user1.getName()).not.toEqual(user2.getName());
        expect(user1.getEmail()).not.toEqual(user2.getEmail());
    });

    it("deve manter imutabilidade dos dados retornados", () => {
        const user = User.create({
            id: "123e4567-e89b-12d3-a456-426614174000",
            name: "Test User",
            email: "test@example.com"
        });

        const originalId = user.getId();
        const originalName = user.getName();
        const originalEmail = user.getEmail();

        // Os getters sempre retornam os mesmos valores
        // Não há como modificar os dados internos através da API pública
        expect(user.getId()).toBe(originalId);
        expect(user.getName()).toBe(originalName);
        expect(user.getEmail()).toBe(originalEmail);
    });
});

describe("User Value Objects - Equals", () => {
    it("deve comparar UserId iguais", () => {
        const user1 = User.create({
            id: "123e4567-e89b-12d3-a456-426614174000",
            name: "User 1",
            email: "user1@example.com"
        });

        const user2 = User.create({
            id: "123e4567-e89b-12d3-a456-426614174000",
            name: "User 2",
            email: "user2@example.com"
        });

        // Acessando os value objects diretamente para teste do equals
        const userId1 = (user1 as any).id;
        const userId2 = (user2 as any).id;

        expect(userId1.equals(userId2)).toBe(true);
    });

    it("deve comparar UserId diferentes", () => {
        const user1 = User.create({
            id: "123e4567-e89b-12d3-a456-426614174000",
            name: "User 1",
            email: "user1@example.com"
        });

        const user2 = User.create({
            id: "123e4567-e89b-12d3-a456-426614174001",
            name: "User 2",
            email: "user2@example.com"
        });

        const userId1 = (user1 as any).id;
        const userId2 = (user2 as any).id;

        expect(userId1.equals(userId2)).toBe(false);
    });

    it("deve comparar UserName iguais", () => {
        const user1 = User.create({
            id: "123e4567-e89b-12d3-a456-426614174000",
            name: "Same Name",
            email: "user1@example.com"
        });

        const user2 = User.create({
            id: "123e4567-e89b-12d3-a456-426614174001",
            name: "Same Name",
            email: "user2@example.com"
        });

        const userName1 = (user1 as any).name;
        const userName2 = (user2 as any).name;

        expect(userName1.equals(userName2)).toBe(true);
    });

    it("deve comparar UserName diferentes", () => {
        const user1 = User.create({
            id: "123e4567-e89b-12d3-a456-426614174000",
            name: "Name 1",
            email: "user1@example.com"
        });

        const user2 = User.create({
            id: "123e4567-e89b-12d3-a456-426614174001",
            name: "Name 2",
            email: "user2@example.com"
        });

        const userName1 = (user1 as any).name;
        const userName2 = (user2 as any).name;

        expect(userName1.equals(userName2)).toBe(false);
    });

    it("deve comparar UserEmail iguais", () => {
        const user1 = User.create({
            id: "123e4567-e89b-12d3-a456-426614174000",
            name: "User 1",
            email: "same@example.com"
        });

        const user2 = User.create({
            id: "123e4567-e89b-12d3-a456-426614174001",
            name: "User 2",
            email: "same@example.com"
        });

        const userEmail1 = (user1 as any).email;
        const userEmail2 = (user2 as any).email;

        expect(userEmail1.equals(userEmail2)).toBe(true);
    });

    it("deve comparar UserEmail diferentes", () => {
        const user1 = User.create({
            id: "123e4567-e89b-12d3-a456-426614174000",
            name: "User 1",
            email: "email1@example.com"
        });

        const user2 = User.create({
            id: "123e4567-e89b-12d3-a456-426614174001",
            name: "User 2",
            email: "email2@example.com"
        });

        const userEmail1 = (user1 as any).email;
        const userEmail2 = (user2 as any).email;

        expect(userEmail1.equals(userEmail2)).toBe(false);
    });
});