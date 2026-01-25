import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductUseCase, UpdateProductUseCase, FindProductUseCase, FindDefaultProductsUseCase, DeleteProductUseCase, FindProductForBrandUseCase, FindProductByUserIdUseCase, Product, IPaginationParams } from '@marketlist/core';
import { UUIDAdapter } from 'src/shared/uuid.adapter';
import { PrismaProductRepository } from './prisma-product.repository';

@Injectable()
export class ProductService {

  private readonly createProductUseCase: CreateProductUseCase;
  private readonly updateProductUseCase: UpdateProductUseCase;
  private readonly findProductUseCase: FindProductUseCase;
  private readonly findDefaultProductsUseCase: FindDefaultProductsUseCase;
  private readonly deleteProductUseCase: DeleteProductUseCase;
  private readonly findProductForBrandUseCase: FindProductForBrandUseCase;
  private readonly findProductByUserIdUseCase: FindProductByUserIdUseCase;

  constructor(
    private readonly productRepository: PrismaProductRepository, private readonly uuidProvider: UUIDAdapter
  ) {
    this.createProductUseCase = new CreateProductUseCase(this.productRepository, this.uuidProvider);
    this.updateProductUseCase = new UpdateProductUseCase(this.productRepository);
    this.findProductUseCase = new FindProductUseCase(this.productRepository);
    this.findDefaultProductsUseCase = new FindDefaultProductsUseCase(this.productRepository);
    this.deleteProductUseCase = new DeleteProductUseCase(this.productRepository);
    this.findProductForBrandUseCase = new FindProductForBrandUseCase(this.productRepository);
    this.findProductByUserIdUseCase = new FindProductByUserIdUseCase(this.productRepository);
  }

  async create(createProductDto: CreateProductDto) {
    return await this.createProductUseCase.execute(createProductDto);
  }

  async findById(id: string): Promise<Product> {
    const result = await this.findProductUseCase.execute({ id });
    // Quando buscar por ID, sempre retorna um único produto
    if (Array.isArray(result)) {
      throw new Error('Erro inesperado: busca por ID retornou múltiplos produtos');
    }
    return result;
  }

  async findByName(name: string) {
    const products = await this.findProductUseCase.execute({ name });
    return Array.isArray(products) ? products : [products];
  }

  async findByUserId(userId: string, pagination?: IPaginationParams) {
    return await this.findProductByUserIdUseCase.execute(userId, pagination);
  }

  async findDefault(userId: string) {
    if (!userId) {
      throw new Error('userId is required');
    }
    const products = await this.findDefaultProductsUseCase.execute(userId);
    return Array.isArray(products) ? products : [products];
  }

  async findByBrand(brand: string) {
    const products = await this.findProductForBrandUseCase.execute(brand);
    return Array.isArray(products) ? products : [products];
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const updateProps = {
      id,
      name: updateProductDto.name,
      brand: updateProductDto.brand,
      price: updateProductDto.price,
    };
    await this.updateProductUseCase.execute(updateProps);
    return await this.findProductUseCase.execute({ id });
  }

  async remove(id: string) {
    return await this.deleteProductUseCase.execute(id);
  }
}
