import { Injectable } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { PrismaPurchaseRepository } from './prisma-purchase.repository';
import { UUIDAdapter } from 'src/shared/uuid.adapter';
import { CreatePurchaseUseCase, FindPurchaseUseCase, UpdatePurchaseUseCase, DeletePurchaseUseCase, FindPurchaseByIdUseCase } from '@marketlist/core'

@Injectable()
export class PurchaseService {
  private readonly createPurchaseUseCase: CreatePurchaseUseCase;
  private readonly findPurchaseUseCase: FindPurchaseUseCase;
  private readonly updatePurchaseUseCase: UpdatePurchaseUseCase;
  private readonly deletePurchaseUseCase: DeletePurchaseUseCase;
  private readonly findPurchaseByIdUseCase: FindPurchaseByIdUseCase;

  constructor(private readonly prismaPurchaseRepository: PrismaPurchaseRepository, private readonly uuidProvider: UUIDAdapter) {
    this.createPurchaseUseCase = new CreatePurchaseUseCase(this.prismaPurchaseRepository, this.uuidProvider);
    this.findPurchaseUseCase = new FindPurchaseUseCase(this.prismaPurchaseRepository);
    this.updatePurchaseUseCase = new UpdatePurchaseUseCase(this.prismaPurchaseRepository);
    this.deletePurchaseUseCase = new DeletePurchaseUseCase(this.prismaPurchaseRepository);
    this.findPurchaseByIdUseCase = new FindPurchaseByIdUseCase(this.prismaPurchaseRepository);
  }

  async create(createPurchaseDto: CreatePurchaseDto) {
    return await this.createPurchaseUseCase.execute(createPurchaseDto);
  }

  async findAll() {
    return await this.findPurchaseUseCase.execute();
  }

  // async findByMarketId(marketId: string) {
  //   return await this.findPurchaseUseCase.execute({ id: marketId });
  // }

  // async findByUserId(userId: string) {
  //   return await this.findPurchaseUseCase.execute({ id: userId });
  // }

  async findById(id: string) {
    return await this.findPurchaseByIdUseCase.execute(id);
  }

  async update(id: string, updatePurchaseDto: UpdatePurchaseDto) {
    return await this.updatePurchaseUseCase.execute({ id, ...updatePurchaseDto });
  }

  async remove(id: string) {
    return await this.deletePurchaseUseCase.execute(id);
  }
}
