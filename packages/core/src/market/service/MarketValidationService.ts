import { Market } from "../model/market.entity";
import { DomainError } from "../../shared/DomainError";

export class MarketValidationException extends DomainError {
    constructor(message: string) {
        super(message, 'MarketValidationException');
    }
}

export class MarketNotFoundException extends DomainError {
    constructor(message: string) {
        super(message, 'MarketNotFoundException');
    }
}

export class MarketAlreadyExistsException extends DomainError {
    constructor(message: string) {
        super(message, 'MarketAlreadyExistsException');
    }
}

export class MarketNameValidationException extends DomainError {
    constructor(message: string) {
        super(message, 'MarketNameValidationException');
    }
}

export class MarketIdValidationException extends DomainError {
    constructor(message: string) {
        super(message, 'MarketIdValidationException');
    }
}

export class MarketValidationService {
    static validateSearchCriteria(id?: string, name?: string): void {
        if (!id && !name) {
            throw new MarketValidationException("Pelo menos um parâmetro de busca (id ou nome) deve ser fornecido");
        }
    }

    static validateMarketExists(market: Market | null, searchType: 'id' | 'name'): Market {
        if (!market) {
            throw new MarketNotFoundException(`Supermercado não encontrado por ${searchType}`);
        }
        return market;
    }

    static validateMarketId(id: string): void {
        if (!id) {
            throw new MarketValidationException("ID do supermercado é obrigatório");
        }
    }

    static validateUniqueMarket(existingMarket: Market | null, name: string): void {
        if (existingMarket) {
            throw new MarketAlreadyExistsException(`Já existe um supermercado com este nome: ${name}`);
        }
    }

    static validateUniqueMarketForUpdate(
        existingMarket: Market | null,
        currentMarketId: string,
        newName: string
    ): void {
        if (existingMarket && existingMarket.getId() !== currentMarketId) {
            throw new MarketAlreadyExistsException(`Já existe um supermercado com este nome: ${newName}`);
        }
    }

    static validateMarketIdFormat(id: string): void {
        if (!id || id.trim().length === 0) {
            throw new MarketIdValidationException("ID do supermercado é obrigatório");
        }

        const trimmedId = id.trim();

        if (!this.isValidUUID(trimmedId)) {
            throw new MarketIdValidationException("Formato de ID do supermercado inválido");
        }
    }

    private static isValidUUID(id: string): boolean {
        return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
    }

    static validateMarketNameFormat(name: string): void {
        if (!name || typeof name !== "string") {
            throw new MarketNameValidationException("Nome do supermercado é obrigatório");
        }

        const trimmedName = name.trim();
        if (trimmedName.length < 2) {
            throw new MarketNameValidationException("Nome do supermercado deve ter pelo menos 2 caracteres");
        }

        if (trimmedName.length > 100) {
            throw new MarketNameValidationException("Nome do supermercado deve ter no máximo 100 caracteres");
        }
    }
}
