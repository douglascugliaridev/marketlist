import { MarketId } from "./value-objects/MarketId";
import { MarketName } from "./value-objects/MarketName";
import { UserId } from "../../users/model/value-objects/UserId";

export class Market {
    private constructor(
        private readonly id: MarketId,
        private readonly name: MarketName,
        private readonly userId: UserId
    ) { }

    static create(props: {
        id: string;
        name: string;
        userId: string;
    }): Market {
        return new Market(
            MarketId.create(props.id),
            MarketName.create(props.name),
            UserId.create(props.userId)
        );
    }

    getId(): string {
        return this.id.getValue();
    }

    getName(): string {
        return this.name.getValue();
    }

    getUserId(): string {
        return this.userId.getValue();
    }

    updateName(newName: string): Market {
        return new Market(this.id, MarketName.create(newName), this.userId);
    }

    getNameForComparison(): string {
        return this.name.getNormalizedValue();
    }

    hasSameName(otherName: string): boolean {
        return this.name.equalsIgnoreCase(otherName);
    }
}
