import { Injectable } from '@nestjs/common';
import { CreateProductItemDto } from './dto/create-product-item.dto';
import { UpdateProductItemDto } from './dto/update-product-item.dto';
import { CreateProductItemUseCase, UpdateProductItemUseCase, DeleteProductItemUseCase, FindProductItemsByPurchaseUseCase } from '@marketlist/core'
import { PrismaProductRepository } from '../product/prisma-product.repository';
import { PrismaProductItemRepository } from './prisma-productItem.repository';


@Injectable()
export class ProductItemService {
  private readonly createProductItemUseCase: CreateProductItemUseCase;
  private readonly findProductItemsByPurchaseUseCase: FindProductItemsByPurchaseUseCase;
  private readonly deleteProductItemUseCase: DeleteProductItemUseCase;
  private readonly updateProductItemUseCase: UpdateProductItemUseCase;

  constructor(
    private readonly productRepository: PrismaProductRepository,
    private readonly productItemRepository: PrismaProductItemRepository
  ) {
    this.createProductItemUseCase = new CreateProductItemUseCase(this.productItemRepository, this.productRepository);
    this.findProductItemsByPurchaseUseCase = new FindProductItemsByPurchaseUseCase(this.productItemRepository);
    this.deleteProductItemUseCase = new DeleteProductItemUseCase(this.productItemRepository);
    this.updateProductItemUseCase = new UpdateProductItemUseCase(this.productItemRepository);
  }

  async createProductItem(createProductItemDto: CreateProductItemDto) {
    return this.createProductItemUseCase.execute(createProductItemDto);
  }

  async findAllProductItems() {
    return this.productItemRepository.findAll();
  }

  async findProductItemsByPurchase(purchaseId: string) {
    return this.findProductItemsByPurchaseUseCase.execute({ purchaseId });
  }

  async removeProductItem(productId: string, purchaseId: string) {
    return this.deleteProductItemUseCase.execute(productId, purchaseId);
  }

  async updateProductItem(updateProductItemDto: UpdateProductItemDto) {
    return this.updateProductItemUseCase.execute(updateProductItemDto);
  }
}
