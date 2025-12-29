import { UserPassword } from "../../src/users/model/user-password.entity";

describe("UserPassword Entity", () => {
    it("deve criar um objeto UserPassword com dados válidos", () => {
        const userPassword = UserPassword.create({
            userId: "123e4567-e89b-12d3-a456-426614174000",
            passwordHash: "$2b$10$examplehash"
        });

        expect(userPassword).toBeDefined();
        expect(userPassword.getUserId()).toBe("123e4567-e89b-12d3-a456-426614174000");
        expect(userPassword.getPasswordHash()).toBe("$2b$10$examplehash");
    });

    describe("validação de userId", () => {
        it("deve lançar erro com userId nulo", () => {
            expect(() => UserPassword.create({
                userId: null as any,
                passwordHash: "$2b$10$examplehash"
            })).toThrow("ID do usuário é obrigatório");
        });

        it("deve lançar erro com userId undefined", () => {
            expect(() => UserPassword.create({
                userId: undefined as any,
                passwordHash: "$2b$10$examplehash"
            })).toThrow("ID do usuário é obrigatório");
        });

        it("deve lançar erro com userId inválido", () => {
            expect(() => UserPassword.create({
                userId: "uuid-invalido",
                passwordHash: "$2b$10$examplehash"
            })).toThrow("Formato de UUID do usuário inválido");
        });

        it("deve lançar erro com userId vazio", () => {
            expect(() => UserPassword.create({
                userId: "",
                passwordHash: "$2b$10$examplehash"
            })).toThrow("ID do usuário é obrigatório");
        });

        it("deve lançar erro com userId tipo inválido", () => {
            expect(() => UserPassword.create({
                userId: 123 as any,
                passwordHash: "$2b$10$examplehash"
            })).toThrow("ID do usuário é obrigatório");
        });
    });

    describe("validação de passwordHash", () => {
        it("deve lançar erro com passwordHash nulo", () => {
            expect(() => UserPassword.create({
                userId: "123e4567-e89b-12d3-a456-426614174000",
                passwordHash: null as any
            })).toThrow("Password hash tem que ser uma string não nula");
        });

        it("deve lançar erro com passwordHash undefined", () => {
            expect(() => UserPassword.create({
                userId: "123e4567-e89b-12d3-a456-426614174000",
                passwordHash: undefined as any
            })).toThrow("Password hash tem que ser uma string não nula");
        });

        it("deve lançar erro com passwordHash vazio", () => {
            expect(() => UserPassword.create({
                userId: "123e4567-e89b-12d3-a456-426614174000",
                passwordHash: ""
            })).toThrow("Password hash tem que ser uma string não nula");
        });

        it("deve lançar erro com passwordHash apenas espaços", () => {
            expect(() => UserPassword.create({
                userId: "123e4567-e89b-12d3-a456-426614174000",
                passwordHash: "   "
            })).toThrow("Password hash não pode ser vazio");
        });

        it("deve lançar erro com passwordHash tipo inválido", () => {
            expect(() => UserPassword.create({
                userId: "123e4567-e89b-12d3-a456-426614174000",
                passwordHash: 123 as any
            })).toThrow("Password hash tem que ser uma string não nula");
        });
    });

    describe("getters", () => {
        it("deve retornar valores corretos dos getters", () => {
            const userPassword = UserPassword.create({
                userId: "123e4567-e89b-12d3-a456-426614174000",
                passwordHash: "$2b$10$examplehash"
            });

            expect(userPassword.getUserId()).toBe("123e4567-e89b-12d3-a456-426614174000");
            expect(userPassword.getPasswordHash()).toBe("$2b$10$examplehash");
        });
    });

    describe("imutabilidade", () => {
        it("deve manter valores imutáveis após criação", () => {
            const userPassword = UserPassword.create({
                userId: "123e4567-e89b-12d3-a456-426614174000",
                passwordHash: "$2b$10$examplehash"
            });

            const userId1 = userPassword.getUserId();
            const userId2 = userPassword.getUserId();
            expect(userId1).toBe(userId2);

            const hash1 = userPassword.getPasswordHash();
            const hash2 = userPassword.getPasswordHash();
            expect(hash1).toBe(hash2);
        });
    });
});