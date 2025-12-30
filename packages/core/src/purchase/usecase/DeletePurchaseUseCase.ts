import { IPurchaseRepository } from "../provider/IPurchaseRepository";
import { NotFoundError } from "../../shared/errors/NotFoundError";

export class DeletePurchaseUseCase {
    constructor(
        private readonly purchaseRepository: IPurchaseRepository
    ) { }

    async execute(id: string): Promise<void> {
        const existingPurchase = await this.purchaseRepository.findById(id);

        if (!existingPurchase) {
            throw new NotFoundError("Compra não encontrada");
        }

        await this.purchaseRepository.delete(id);
    }
}