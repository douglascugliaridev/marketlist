// Market imports
import { CreateMarketUseCase, DeleteMarketUseCase, FindMarketUseCase, UpdateMarketUseCase } from "./market/usecase/index";
import { Market } from "./market/model/market.entity";
import { IMarketRepository } from "./market/provider/IMarketRepository";
import { IUUIDProvider } from "./shared/IUUIDProvider";

// User imports
import { User } from "./users/model/user.entity";
import { IUserRepository } from "./users/provider/IUserRepository";
import { IUserPasswordRepository } from "./users/provider/IUserPasswordRepository";
import { IPasswordHasher } from "./users/provider/IPasswordHasher";
import { CreateUserUseCase } from "./users/usecase/CreateUserUseCase";
import { LoginUseCase } from "./users/usecase/LoginUseCase";

// Purchase imports
import { Purchase } from "./purchase/model/purchase.entity";
import { IPurchaseRepository } from "./purchase/provider/IPurchaseRepository";
import { CreatePurchaseUseCase, FindPurchaseUseCase, UpdatePurchaseUseCase, DeletePurchaseUseCase, CalculatePurchaseTotalUseCase } from "./purchase/usecase/index";
import { PurchaseId, PurchaseName } from "./purchase/model/value-objects/index";

// ProductItem imports
import { ProductItem } from "./productItem/model/product-item.entity";
import { IProductItemRepository } from "./productItem/provider/IProductItemRepository";
import { CreateProductItemUseCase, UpdateProductItemUseCase, DeleteProductItemUseCase, FindProductItemsByPurchaseUseCase } from "./productItem/usecase/index";
import { ProductItemId, Price, Amount } from "./productItem/model/value-objects/index";

// Error imports
import { DomainError } from "./shared/errors/DomainError";

// Market exports
export { CreateMarketUseCase, UpdateMarketUseCase, DeleteMarketUseCase, FindMarketUseCase };
export { Market, IMarketRepository, IUUIDProvider };

// User exports
export { CreateUserUseCase, LoginUseCase };
export { User, IUserRepository, IUserPasswordRepository, IPasswordHasher };

// Purchase exports
export { Purchase, IPurchaseRepository };
export { CreatePurchaseUseCase, FindPurchaseUseCase, UpdatePurchaseUseCase, DeletePurchaseUseCase, CalculatePurchaseTotalUseCase };
export { PurchaseId, PurchaseName };

// ProductItem exports
export { ProductItem, IProductItemRepository };
export { CreateProductItemUseCase, UpdateProductItemUseCase, DeleteProductItemUseCase, FindProductItemsByPurchaseUseCase };
export { ProductItemId, Price, Amount };

// Error exports
export { DomainError };