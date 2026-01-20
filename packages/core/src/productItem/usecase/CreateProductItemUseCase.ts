import { IProductItemRepository } from "../provider/IProductItemRepository";
import { IProductRepository } from "../../product/provider/IProductRepository";
import { IPurchaseRepository } from "../../purchase/provider/IPurchaseRepository";
import { ProductItem } from "../model/product-item.entity";
import { ProductItemValidationService } from "../service/ProductItemValidationService";
import { ProductValidationService } from "../../product/service/ProductValidationService";
import { PurchaseValidationService } from "../../purchase/service/PurchaseValidationService";

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
        private readonly purchaseRepository: IPurchaseRepository,
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

        // Verificar se a compra existe
        const purchase = await this.purchaseRepository.findById(props.purchaseId);
        PurchaseValidationService.validatePurchaseExists(purchase);

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