import { IPurchaseRepository } from "../provider/IPurchaseRepository";
import { NotFoundError } from "../../shared/errors/NotFoundError";

interface CalculateTotalProps {
    purchaseId: string;
}

export class CalculatePurchaseTotalUseCase {
    constructor(
        private readonly purchaseRepository: IPurchaseRepository
    ) { }

    async execute(props: CalculateTotalProps): Promise<{ total: number; itemsCount: number }> {
        const purchase = await this.purchaseRepository.findById(props.purchaseId);

        if (!purchase) {
            throw new NotFoundError("Compra não encontrada");
        }

        return {
            total: purchase.getTotal(),
            itemsCount: purchase.getItemsCount()
        };
    }
}