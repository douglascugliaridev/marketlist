import { Product } from "../model/product.entity";
import { DomainError } from "../../shared/DomainError";

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
            throw new ProductValidationException("Product ID or name is required");
        }
    }

    static validateProductExists(product: Product | Product[] | null, searchType: 'id' | 'name'): Product {
        if (!product) {
            throw new ProductNotFoundException(`Product not found by ${searchType}`);
        }

        if (Array.isArray(product)) {
            if (product.length === 0) {
                throw new ProductNotFoundException(`Product not found by ${searchType}`);
            }
            return product[0]; // Retorna o primeiro produto encontrado por nome
        }

        return product;
    }

    static validateProductIdFormat(id: string): void {
        if (!id || id.trim().length === 0) {
            throw new ProductIdValidationException("Product ID is required");
        }

        const trimmedId = id.trim();

        if (!this.isValidUUID(trimmedId)) {
            throw new ProductIdValidationException("Invalid product ID format");
        }
    }

    static validateProductNameFormat(name: string): void {
        if (!name || name.trim().length === 0) {
            throw new ProductNameValidationException("Product name is required");
        }

        const trimmedName = name.trim();
        if (trimmedName.length < 2) {
            throw new ProductNameValidationException("Product name must have at least 2 characters");
        }

        if (trimmedName.length > 100) {
            throw new ProductNameValidationException("Product name must have at most 100 characters");
        }
    }

    private static isValidUUID(id: string): boolean {
        return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
    }

    static validateProductBrandFormat(brand: string): void {
        if (!brand || brand.trim().length === 0) {
            throw new ProductBrandValidationException("Product brand is required");
        }

        const trimmedBrand = brand.trim();
        if (trimmedBrand.length < 1) {
            throw new ProductBrandValidationException("Product brand must have at least 1 character");
        }

        if (trimmedBrand.length > 50) {
            throw new ProductBrandValidationException("Product brand must have at most 50 characters");
        }
    }

    static validateUserIdFormat(userId: string): void {
        if (!userId || userId.trim().length === 0) {
            throw new ProductUserIdValidationException("User ID is required");
        }

        const trimmedUserId = userId.trim();

        if (!this.isValidUUID(trimmedUserId)) {
            throw new ProductUserIdValidationException("Invalid user ID format");
        }
    }
}
