import { Product } from "../model/product.entity";
import { DomainError } from "../../shared/DomainError";

export class ProductAlreadyExistsException extends DomainError {
    constructor(message: string) {
        super(message, 'ProductAlreadyExistsException');
    }
}

export class ProductBrandValidationException extends DomainError {
    constructor(message: string) {
        super(message, 'ProductBrandValidationException');
    }
}

export class ProductIdValidationException extends DomainError {
    constructor(message: string) {
        super(message, 'ProductIdValidationException');
    }
}

export class ProductNameValidationException extends DomainError {
    constructor(message: string) {
        super(message, 'ProductNameValidationException');
    }
}

export class ProductValidationException extends DomainError {
    constructor(message: string) {
        super(message, 'ProductValidationException');
    }
}

export class ProductNotFoundException extends DomainError {
    constructor(message: string) {
        super(message, 'ProductNotFoundException');
    }
}

export class ProductUserIdValidationException extends DomainError {
    constructor(message: string) {
        super(message, 'ProductUserIdValidationException');
    }
}

export class ProductValidationService {
    static validateSearchCriteria(id?: string, name?: string): void {
        if (!id && !name) {
            throw new ProductValidationException("ID ou nome do produto é obrigatório");
        }
    }

    static validateProductExists(product: Product | null, searchType: 'id' | 'name'): Product {
        if (!product) {
            throw new ProductNotFoundException(`Produto não encontrado por ${searchType}`);
        }

        return product;
    }

    static validateProductsExists(products: Product[], searchType: 'id' | 'name'): Product[] {
        if (!products || products.length === 0) {
            throw new ProductNotFoundException(`Produto não encontrado por ${searchType}`);
        }

        return products;
    }

    static validateProductIdFormat(id: string): void {
        if (!id || id.trim().length === 0) {
            throw new ProductIdValidationException("ID do produto é obrigatório");
        }

        const trimmedId = id.trim();

        if (!this.isValidUUID(trimmedId)) {
            throw new ProductIdValidationException("Formato de ID do produto inválido");
        }
    }

    static validateProductNameFormat(name: string): void {
        if (!name || name.trim().length === 0) {
            throw new ProductNameValidationException("Nome do produto é obrigatório");
        }

        const trimmedName = name.trim();
        if (trimmedName.length < 2) {
            throw new ProductNameValidationException("Nome do produto deve ter pelo menos 2 caracteres");
        }

        if (trimmedName.length > 100) {
            throw new ProductNameValidationException("Nome do produto deve ter no máximo 100 caracteres");
        }
    }

    private static isValidUUID(id: string): boolean {
        return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
    }

    static validateProductBrandFormat(brand: string): void {
        if (!brand || brand.trim().length === 0) {
            throw new ProductBrandValidationException("Marca do produto é obrigatória");
        }

        const trimmedBrand = brand.trim();
        if (trimmedBrand.length < 1) {
            throw new ProductBrandValidationException("Marca do produto deve ter pelo menos 1 caractere");
        }

        if (trimmedBrand.length > 50) {
            throw new ProductBrandValidationException("Marca do produto deve ter no máximo 50 caracteres");
        }
    }

    static validateUserIdFormat(userId: string): void {
        if (!userId || userId.trim().length === 0) {
            throw new ProductUserIdValidationException("ID do usuário é obrigatório");
        }

        const trimmedUserId = userId.trim();

        if (!this.isValidUUID(trimmedUserId)) {
            throw new ProductUserIdValidationException("Formato de ID do usuário inválido");
        }
    }

    static validateUniqueProduct(existingProducts: Product[], name: string, brand: string): void {
        const duplicateProduct = existingProducts.find(
            product => product.getName().toLowerCase() === name.toLowerCase() &&
                product.getBrand().toLowerCase() === brand.toLowerCase()
        );

        if (duplicateProduct) {
            throw new ProductAlreadyExistsException(`Já existe um produto cadastrado com o nome "${name}" e marca "${brand}"`);
        }
    }

    static validateUniqueProductForUpdate(
        existingProducts: Product[],
        currentProductId: string,
        name: string,
        brand: string
    ): void {
        const duplicateProduct = existingProducts.find(
            product => product.getId() !== currentProductId &&
                product.getName().toLowerCase() === name.toLowerCase() &&
                product.getBrand().toLowerCase() === brand.toLowerCase()
        );

        if (duplicateProduct) {
            throw new ProductAlreadyExistsException(`Já existe um produto cadastrado com o nome "${name}" e marca "${brand}"`);
        }
    }
}
