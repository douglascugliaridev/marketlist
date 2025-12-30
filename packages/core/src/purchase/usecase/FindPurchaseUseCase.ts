import { IPurchaseRepository } from "../provider/IPurchaseRepository";
import { Purchase } from "../model/purchase.entity";
import { NotFoundError } from "../../shared/errors/NotFoundError";

interface FindPurchaseProps {
    id: string;
}

export class FindPurchaseUseCase {
    constructor(
        private readonly purchaseRepository: IPurchaseRepository
    ) { }

    async execute(props: FindPurchaseProps): Promise<Purchase> {
        const purchase = await this.purchaseRepository.findById(props.id);

        if (!purchase) {
            throw new NotFoundError("Compra não encontrada");
        }

        return purchase;
    }
}