import { IPurchaseRepository } from "../provider/IPurchaseRepository";
import { PurchaseValidationService } from "../service/PurchaseValidationService";

interface CalculateTotalProps {
    purchaseId: string;
}

export class CalculatePurchaseTotalUseCase {
    constructor(
        private readonly purchaseRepository: IPurchaseRepository
    ) { }

    async execute(props: CalculateTotalProps): Promise<{ total: number; itemsCount: number }> {
        const purchase = await this.purchaseRepository.findById(props.purchaseId);

        const validatedPurchase = PurchaseValidationService.validatePurchaseExists(purchase);

        return {
            total: validatedPurchase.getTotal(),
            itemsCount: validatedPurchase.getItemsCount()
        };
    }
}