import { IPurchaseRepository } from "../provider/IPurchaseRepository";
import { Purchase } from "../model/purchase.entity";
import { PurchaseValidationService } from "../service/PurchaseValidationService";

export class FindPurchaseByIdUseCase {
    constructor(private purchaseRepository: IPurchaseRepository) { }

    async execute(id: string): Promise<Purchase | null> {
        PurchaseValidationService.validatePurchaseIdFormat(id);
        const purchase = await this.purchaseRepository.findById(id);
        return purchase;
    }
}