import { ProductItem } from "../model/product-item.entity";
import { DomainError } from "../../shared/DomainError";

export class ProductItemIdValidationException extends DomainError {
    constructor(message: string) {
        super(message, 'ProductItemIdValidationException');
    }
}

export class ProductItemValidationException extends DomainError {
    constructor(message: string) {
        super(message, 'ProductItemValidationException');
    }
}

export class ProductItemNotFoundException extends DomainError {
    constructor(message: string) {
        super(message, 'ProductItemNotFoundException');
    }
}

export class ProductItemAlreadyExistsException extends DomainError {
    constructor(message: string) {
        super(message, 'ProductItemAlreadyExistsException');
    }
}

export class ProductItemPurchaseIdValidationException extends DomainError {
    constructor(message: string) {
        super(message, 'ProductItemPurchaseIdValidationException');
    }
}

export class ProductItemAmountValidationException extends DomainError {
    constructor(message: string) {
        super(message, 'ProductItemAmountValidationException');
    }
}

export class ProductItemPriceValidationException extends DomainError {
    constructor(message: string) {
        super(message, 'ProductItemPriceValidationException');
    }
}

export class ProductItemValidationService {
    static validateProductItemExists(productItem: ProductItem | null): ProductItem {
        if (!productItem) {
            throw new ProductItemNotFoundException("Item do produto não encontrado");
        }
        return productItem;
    }

    static validateProductItemsExist(items: ProductItem[] | null): ProductItem[] {
        if (!items || items.length === 0) {
            throw new ProductItemNotFoundException("Nenhum item encontrado para esta compra");
        }
        return items;
    }

    static validateUniqueProductItem(existingItem: ProductItem | null): void {
        if (existingItem) {
            throw new ProductItemAlreadyExistsException("Este produto já foi adicionado à compra");
        }
    }

    static validateProductItemIdFormat(id: string): void {
        if (!id || id.trim().length === 0) {
            throw new ProductItemIdValidationException("ID do item do produto é obrigatório");
        }

        const trimmedId = id.trim();

        if (!this.isValidUUID(trimmedId)) {
            throw new ProductItemIdValidationException("Formato de ID do item do produto inválido");
        }
    }

    static validateProductItemPurchaseIdFormat(id: string): void {
        if (!id || id.trim().length === 0) {
            throw new ProductItemPurchaseIdValidationException("ID da compra do item do produto é obrigatório");
        }

        const trimmedId = id.trim();

        if (!this.isValidUUID(trimmedId)) {
            throw new ProductItemPurchaseIdValidationException("Formato de ID da compra do item do produto inválido");
        }
    }

    static validateProductItemAmount(amount: number): void {
        if (amount < 0) {
            throw new ProductItemAmountValidationException("Quantidade não pode ser negativa");
        }

        if (amount === 0) {
            throw new ProductItemAmountValidationException("Quantidade não pode ser zero");
        }

        if (!Number.isInteger(amount)) {
            throw new ProductItemAmountValidationException("Quantidade deve ser um número inteiro");
        }

        if (amount > 99999) {
            throw new ProductItemAmountValidationException("Quantidade não pode ser maior que 99.999");
        }
    }

    static validateProductItemPrice(price: number): void {
        if (price < 0) {
            throw new ProductItemPriceValidationException("Preço não pode ser negativo");
        }

        if (price === 0) {
            throw new ProductItemPriceValidationException("Preço não pode ser zero");
        }

        if (price > 999999.99) {
            throw new ProductItemPriceValidationException("Preço não pode ser maior que R$ 999.999,99");
        }

        // Validar precisão decimal (máximo 2 casas decimais)
        const decimalPlaces = (price.toString().split('.')[1] || '').length;
        if (decimalPlaces > 2) {
            throw new ProductItemPriceValidationException("Preço não pode ter mais de 2 casas decimais");
        }
    }

    static validateProductItemPreviousPrice(previousPrice: number): void {
        if (previousPrice < 0) {
            throw new ProductItemPriceValidationException("Preço anterior não pode ser negativo");
        }

        if (previousPrice > 999999.99) {
            throw new ProductItemPriceValidationException("Preço anterior não pode ser maior que R$ 999.999,99");
        }

        // Validar precisão decimal (máximo 2 casas decimais)
        const decimalPlaces = (previousPrice.toString().split('.')[1] || '').length;
        if (decimalPlaces > 2) {
            throw new ProductItemPriceValidationException("Preço anterior não pode ter mais de 2 casas decimais");
        }
    }

    private static isValidUUID(id: string): boolean {
        return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
    }
}
