import { IPurchaseRepository } from "../provider/IPurchaseRepository";
import { Purchase } from "../model/purchase.entity";
import { PurchaseValidationService } from "../service/PurchaseValidationService";

export class FindPurchaseUseCase {
    constructor(
        private readonly purchaseRepository: IPurchaseRepository
    ) { }

    async execute(): Promise<Purchase[]> {
        const purchases = await this.purchaseRepository.findAll()

        return PurchaseValidationService.validatePurchaseListExists(purchases);
    }
}