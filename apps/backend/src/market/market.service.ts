import { Injectable } from '@nestjs/common';
import { CreateMarketDto } from './dto/create-market.dto';
import { UpdateMarketDto } from './dto/update-market.dto';
import { CreateMarketUseCase, UpdateMarketUseCase, FindMarketUseCase, DeleteMarketUseCase } from '@marketlist/core';
import { UUIDAdapter } from '../shared/uuid.adapter';
import { PrismaMarketRepository } from './prisma-market.repository';

@Injectable()
export class MarketService {
  private readonly createMarketUseCase: CreateMarketUseCase;
  private readonly updateMarketUseCase: UpdateMarketUseCase;
  private readonly findMarketUseCase: FindMarketUseCase;
  private readonly deleteMarketUseCase: DeleteMarketUseCase;

  constructor(
    private readonly marketRepository: PrismaMarketRepository,
    private readonly uuidProvider: UUIDAdapter,
  ) {
    this.createMarketUseCase = new CreateMarketUseCase(
      this.marketRepository,
      this.uuidProvider,
    );
    this.updateMarketUseCase = new UpdateMarketUseCase(
      this.marketRepository,
    );
    this.findMarketUseCase = new FindMarketUseCase(
      this.marketRepository,
    );
    this.deleteMarketUseCase = new DeleteMarketUseCase(
      this.marketRepository,
    );
  }

  async create(createMarketDto: CreateMarketDto) {
    const result = await this.createMarketUseCase.execute(createMarketDto);
    return await this.marketRepository.findById(result.marketId);
  }

  async findAll() {
    return await this.marketRepository.findAll();
  }

  async findById(id: string) {
    return await this.findMarketUseCase.execute({ id });
  }

  async update(id: string, updateMarketDto: UpdateMarketDto) {
    await this.updateMarketUseCase.execute({
      id,
      name: updateMarketDto.name || ''
    });
    return await this.marketRepository.findById(id);
  }

  async delete(id: string) {
    await this.deleteMarketUseCase.execute(id);
  }
}
