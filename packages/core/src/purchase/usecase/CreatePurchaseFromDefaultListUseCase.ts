import { IPurchaseRepository } from "../provider/IPurchaseRepository";
import { IProductItemRepository } from "../../productItem/provider/IProductItemRepository";
import { IUUIDProvider } from "../../shared/IUUIDProvider";
import { Purchase } from "../model/purchase.entity";
import { ProductItem } from "../../productItem/model/product-item.entity";
import { FindDefaultProductsUseCase } from "../../product/usecase/FindDefaultProductsUseCase";
import { FindLastProductPriceUseCase } from "../../productItem/usecase/FindLastProductPriceUseCase";
import { CreateProductItemUseCase } from "../../productItem/usecase/CreateProductItemUseCase";

interface CreatePurchaseFromDefaultListProps {
    userId: string;
    marketId: string;
    name?: string | null;
}

export class CreatePurchaseFromDefaultListUseCase {
    constructor(
        private readonly purchaseRepository: IPurchaseRepository,
        private readonly productItemRepository: IProductItemRepository,
        private readonly uuidProvider: IUUIDProvider,
        private readonly findDefaultProductsUseCase: FindDefaultProductsUseCase,
        private readonly findLastProductPriceUseCase: FindLastProductPriceUseCase,
        private readonly createProductItemUseCase: CreateProductItemUseCase
    ) { }

    async execute(props: CreatePurchaseFromDefaultListProps): Promise<{ purchaseId: string; productItems: ProductItem[] }> {
        // 1. Criar a compra vazia
        const purchase = Purchase.create({
            id: this.uuidProvider.generate(),
            name: props.name,
            userId: props.userId,
            marketId: props.marketId
        });

        await this.purchaseRepository.save(purchase);

        // 2. Buscar produtos marcados como lista padrão
        const defaultProducts = await this.findDefaultProductsUseCase.execute(props.userId);

        if (defaultProducts.length === 0) {
            return { purchaseId: purchase.getId(), productItems: [] };
        }

        // 3. Para cada produto, buscar último preço e criar ProductItem
        const productItems: ProductItem[] = [];

        for (const product of defaultProducts) {
            // Buscar último preço registrado para este produto
            const lastPrice = await this.findLastProductPriceUseCase.execute(product.getId());

            // Se não tiver preço anterior, usar 0
            const previousPrice = lastPrice ?? 0;

            // Criar ProductItem com quantidade padrão 1 e preço atual igual ao anterior
            await this.createProductItemUseCase.execute({
                productId: product.getId(),
                purchaseId: purchase.getId(),
                price: previousPrice, // preço atual igual ao último registrado
                previousPrice: previousPrice,
                amount: 1 // quantidade padrão
            });

            // Buscar o ProductItem criado para retornar
            const createdItem = await this.productItemRepository.findByPurchaseAndProduct(
                purchase.getId(),
                product.getId()
            );

            if (createdItem) {
                productItems.push(createdItem);
            }
        }

        return {
            purchaseId: purchase.getId(),
            productItems
        };
    }
}