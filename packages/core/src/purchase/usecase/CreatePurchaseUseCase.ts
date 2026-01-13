import { IPurchaseRepository } from "../provider/IPurchaseRepository";
import { Purchase } from "../model/purchase.entity";
import { IUUIDProvider } from "../../shared/IUUIDProvider";

interface PurchaseProps {
    id?: string;
    name?: string | null;
    userId: string;
    marketId: string;
}

export class CreatePurchaseUseCase {
    constructor(
        private readonly purchaseRepository: IPurchaseRepository,
        private readonly uuidProvider: IUUIDProvider
    ) { }

    async execute(purchaseProps: PurchaseProps): Promise<Purchase> {
        const purchase = Purchase.create({
            id: purchaseProps.id || this.uuidProvider.generate(),
            name: purchaseProps.name,
            userId: purchaseProps.userId,
            marketId: purchaseProps.marketId
        });

        await this.purchaseRepository.save(purchase);

        return purchase;
    }
}