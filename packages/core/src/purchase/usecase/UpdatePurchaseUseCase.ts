import { IPurchaseRepository } from "../provider/IPurchaseRepository";
import { PurchaseValidationService } from "../service/PurchaseValidationService";

interface UpdatePurchaseProps {
    id: string;
    name?: string | null;
}

export class UpdatePurchaseUseCase {
    constructor(
        private readonly purchaseRepository: IPurchaseRepository
    ) { }

    async execute(props: UpdatePurchaseProps): Promise<void> {
        const existingPurchase = await this.purchaseRepository.findById(props.id);

        PurchaseValidationService.validatePurchaseExists(existingPurchase);

        await this.purchaseRepository.update(props.id, props.name);
    }
}