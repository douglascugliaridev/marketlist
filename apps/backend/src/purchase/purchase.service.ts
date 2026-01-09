import { Injectable } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { PrismaPurchaseRepository } from './prisma-purchase.repository';
import { UUIDAdapter } from 'src/shared/uuid.adapter';
import { CreatePurchaseUseCase, FindPurchaseUseCase, UpdatePurchaseUseCase, DeletePurchaseUseCase } from '@marketlist/core'

@Injectable()
export class PurchaseService {
  private readonly createPurchaseUseCase: CreatePurchaseUseCase;
  private readonly findAllPurchasesUseCase: FindPurchaseUseCase;
  private readonly findPurchaseByIdUseCase: FindPurchaseUseCase;
  private readonly findPurchasesByMarketIdUseCase: FindPurchaseUseCase;
  private readonly findPurchasesByUserIdUseCase: FindPurchaseUseCase;
  private readonly updatePurchaseUseCase: UpdatePurchaseUseCase;
  private readonly deletePurchaseUseCase: DeletePurchaseUseCase;

  constructor(private readonly prismaPurchaseRepository: PrismaPurchaseRepository, private readonly uuidProvider: UUIDAdapter) {
    this.createPurchaseUseCase = new CreatePurchaseUseCase(this.prismaPurchaseRepository, this.uuidProvider);
    this.findAllPurchasesUseCase = new FindPurchaseUseCase(this.prismaPurchaseRepository);
    this.findPurchaseByIdUseCase = new FindPurchaseUseCase(this.prismaPurchaseRepository);
    this.findPurchasesByMarketIdUseCase = new FindPurchaseUseCase(this.prismaPurchaseRepository);
    this.findPurchasesByUserIdUseCase = new FindPurchaseUseCase(this.prismaPurchaseRepository);
    this.updatePurchaseUseCase = new UpdatePurchaseUseCase(this.prismaPurchaseRepository);
    this.deletePurchaseUseCase = new DeletePurchaseUseCase(this.prismaPurchaseRepository);
  }

  async create(createPurchaseDto: CreatePurchaseDto) {
    return await this.createPurchaseUseCase.execute(createPurchaseDto);
  }

  async findAll() {
    return await this.findAllPurchasesUseCase.execute();
  }

  async findByMarketId(marketId: string) {
    return await this.findPurchasesByMarketIdUseCase.execute({ id: marketId });
  }

  async findByUserId(userId: string) {
    return await this.findPurchasesByUserIdUseCase.execute({ id: userId });
  }

  async findById(id: string) {
    return await this.findPurchaseByIdUseCase.execute({ id });
  }

  async update(id: string, updatePurchaseDto: UpdatePurchaseDto) {
    return await this.updatePurchaseUseCase.execute({ id, ...updatePurchaseDto });
  }

  async remove(id: string) {
    return await this.deletePurchaseUseCase.execute(id);
  }
}
