import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductUseCase, UpdateProductUseCase, FindProductUseCase, FindDefaultProductsUseCase, DeleteProductUseCase } from '@marketlist/core';
import { UUIDAdapter } from 'src/shared/uuid.adapter';
import { PrismaProductRepository } from './prisma-product.repository';

@Injectable()
export class ProductService {

  private readonly createProductUseCase: CreateProductUseCase;
  private readonly updateProductUseCase: UpdateProductUseCase;
  private readonly findProductUseCase: FindProductUseCase;
  private readonly findDefaultProductsUseCase: FindDefaultProductsUseCase;
  private readonly deleteProductUseCase: DeleteProductUseCase;

  constructor(
    private readonly productRepository: PrismaProductRepository, private readonly uuidProvider: UUIDAdapter
  ) {
    this.createProductUseCase = new CreateProductUseCase(this.productRepository, this.uuidProvider);
    this.updateProductUseCase = new UpdateProductUseCase(this.productRepository);
    this.findProductUseCase = new FindProductUseCase(this.productRepository);
    this.findDefaultProductsUseCase = new FindDefaultProductsUseCase(this.productRepository);
    this.deleteProductUseCase = new DeleteProductUseCase(this.productRepository);
  }

  async create(createProductDto: CreateProductDto) {
    return await this.createProductUseCase.execute(createProductDto);
  }

  async findById(id: string) {
    const product = await this.findProductUseCase.execute({ id });
    return product;
  }

  async findByName(name: string) {
    const products = await this.findProductUseCase.execute({ name });
    return Array.isArray(products) ? products : [products];
  }

  async findByUserId(userId: string) {
    const products = await this.productRepository.findByUserId(userId);
    return products;
  }

  async findDefault(userId: string) {
    if (!userId) {
      throw new Error('userId is required');
    }
    const products = await this.findDefaultProductsUseCase.execute(userId);
    return Array.isArray(products) ? products : [products];
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const updateProps = {
      id,
      name: updateProductDto.name,
      brand: updateProductDto.brand,
      price: updateProductDto.price,
    };
    return await this.updateProductUseCase.execute(updateProps);
  }

  async remove(id: string) {
    return await this.deleteProductUseCase.execute(id);
  }
}
