import { IProductItemRepository } from "../provider/IProductItemRepository";
import { IProductRepository } from "../../product/provider/IProductRepository";
import { ProductItem } from "../model/product-item.entity";
import { ProductItemValidationService } from "../service/ProductItemValidationService";
import { ProductValidationService } from "../../product/service/ProductValidationService";

interface CreateProductItemProps {
    productId: string;
    purchaseId: string;
    price: number;
    previousPrice: number;
    amount: number;
}

export class CreateProductItemUseCase {
    constructor(
        private readonly productItemRepository: IProductItemRepository,
        private readonly productRepository: IProductRepository,
    ) { }

    async execute(props: CreateProductItemProps): Promise<{}> {

        ProductItemValidationService.validateProductItemAmount(props.amount);
        ProductItemValidationService.validateProductItemPrice(props.price);
        //   ProductItemValidationService.validateProductItemPrice(props.previousPrice);
        ProductItemValidationService.validateProductItemPurchaseIdFormat(props.purchaseId);
        ProductValidationService.validateProductIdFormat(props.productId);

        // Verificar se o produto existe na tabela produto
        const product = await this.productRepository.findById(props.productId);
        ProductValidationService.validateProductExists(product, 'id');

        // Verificar se já existe um item para este produto nesta compra
        const existingItem = await this.productItemRepository.findByPurchaseAndProduct(
            props.purchaseId,
            props.productId
        );

        ProductItemValidationService.validateUniqueProductItem(existingItem);

        const productItem = ProductItem.create({
            productId: props.productId,
            purchaseId: props.purchaseId,
            price: props.price,
            previousPrice: props.previousPrice,
            amount: props.amount
        });

        await this.productItemRepository.save(productItem);

        return productItem;
    }
}