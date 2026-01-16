import { Purchase } from "../model/purchase.entity";
import { DomainError } from "../../shared/DomainError";

export class PurchaseNameValidationException extends DomainError {
    constructor(message: string) {
        super(message, 'PurchaseNameValidationException');
    }
}

export class PurchaseIdValidationException extends DomainError {
    constructor(message: string) {
        super(message, 'PurchaseIdValidationException');
    }
}

export class PurchaseValidationException extends DomainError {
    constructor(message: string) {
        super(message, 'PurchaseValidationException');
    }
}

export class PurchaseNotFoundException extends DomainError {
    constructor(message: string) {
        super(message, 'PurchaseNotFoundException');
    }
}

export class PurchaseValidationService {
    static validatePurchaseExists(purchase: Purchase | null): Purchase {
        if (!purchase) {
            throw new PurchaseNotFoundException("Compra não encontrada");
        }
        return purchase;
    }

    static validatePurchaseListExists(purchases: Purchase[] | null): Purchase[] {
        if (!purchases) {
            throw new PurchaseNotFoundException("Compras não encontradas");
        }
        return purchases;
    }

    static validatePurchaseIdFormat(id: string): void {
        if (!id || id.trim().length === 0) {
            throw new PurchaseIdValidationException("ID da compra é obrigatório");
        }

        const trimmedId = id.trim();

        if (!this.isValidUUID(trimmedId)) {
            throw new PurchaseIdValidationException("Formato de ID da compra inválido");
        }
    }

    private static isValidUUID(id: string): boolean {
        return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
    }

    static validatePurchaseNameFormat(name: string | null | undefined): void {
        if (name !== undefined && name !== null) {
            const trimmedName = name.trim();

            if (trimmedName.length > 100) {
                throw new PurchaseNameValidationException("Nome da compra não pode ter mais de 100 caracteres");
            }
        }
    }
}
