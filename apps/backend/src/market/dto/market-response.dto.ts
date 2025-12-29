export class MarketResponseDto {
    id?: string;
    name: string;

    static fromEntity(entity: any): MarketResponseDto {
        const dto = new MarketResponseDto();
        dto.id = entity.getId();
        dto.name = entity.getName();
        return dto;
    }

    static fromEntities(entities: any[]): MarketResponseDto[] {
        return entities.map(entity => this.fromEntity(entity));
    }
}
