import { IPurchaseRepository } from "../provider/IPurchaseRepository";
import { NotFoundError } from "../../shared/errors/NotFoundError";

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

        if (!existingPurchase) {
            throw new NotFoundError("Compra não encontrada");
        }

        await this.purchaseRepository.update(props.id, props.name);
    }
}