import { IProductItemRepository } from "../provider/IProductItemRepository";
import { ProductItem } from "../model/product-item.entity";
import { Product } from "../../product/model/product.entity";
import { Purchase } from "../../purchase/model/purchase.entity";
import { IUUIDProvider } from "../../shared/IUUIDProvider";
import { BadRequest } from "../../shared/errors/BadRequest";

interface CreateProductItemProps {
    id?: string;
    productId: string;
    purchaseId: string;
    price: number;
    previousPrice: number;
    amount: number;
    product: Product;
    purchase: Purchase;
}

export class CreateProductItemUseCase {
    constructor(
        private readonly productItemRepository: IProductItemRepository,
        private readonly uuidProvider: IUUIDProvider
    ) { }

    async execute(props: CreateProductItemProps): Promise<{ productItemId: string }> {
        // Verificar se já existe um item para este produto nesta compra
        const existingItem = await this.productItemRepository.findByPurchaseAndProduct(
            props.purchaseId,
            props.productId
        );

        if (existingItem) {
            throw new BadRequest("Este produto já foi adicionado à compra");
        }

        const productItem = ProductItem.create({
            id: props.id || this.uuidProvider.generate(),
            product: props.product,
            purchase: props.purchase,
            price: props.price,
            previousPrice: props.previousPrice,
            amount: props.amount
        });

        await this.productItemRepository.save(productItem);

        return { productItemId: productItem.getId() };
    }
}