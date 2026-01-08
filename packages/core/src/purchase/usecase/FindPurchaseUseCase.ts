import { IPurchaseRepository } from "../provider/IPurchaseRepository";
import { Purchase } from "../model/purchase.entity";
import { PurchaseValidationService } from "../service/PurchaseValidationService";

interface FindPurchaseProps {
    id: string;
}

export class FindPurchaseUseCase {
    constructor(
        private readonly purchaseRepository: IPurchaseRepository
    ) { }

    async execute(props: FindPurchaseProps): Promise<Purchase> {
        const purchase = await this.purchaseRepository.findById(props.id);

        return PurchaseValidationService.validatePurchaseExists(purchase);
    }
}