import { IPurchaseRepository } from "../provider/IPurchaseRepository";
import { PurchaseValidationService } from "../service/PurchaseValidationService";

export class DeletePurchaseUseCase {
    constructor(
        private readonly purchaseRepository: IPurchaseRepository
    ) { }

    async execute(id: string): Promise<void> {
        const existingPurchase = await this.purchaseRepository.findById(id);

        PurchaseValidationService.validatePurchaseExists(existingPurchase);

        await this.purchaseRepository.delete(id);
    }
}