import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from '../stores/store.entity';
import { CreateProductDto } from './create-product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepo: Repository<Product>,
    @InjectRepository(Store)
    private readonly storesRepo: Repository<Store>,
  ) {}

  private async assertStoreExists(storeId: string) {
    const store = await this.storesRepo.findOneBy({ id: storeId });
    if (!store) {
      throw new NotFoundException(`Store ${storeId} not found`);
    }
  }

  async create(storeId: string, dto: CreateProductDto) {
    await this.assertStoreExists(storeId);
    const product = this.productsRepo.create({
      ...dto,
      brand: dto.brand ?? null,
      storeId,
    });
    return this.productsRepo.save(product);
  }

  async findByStore(storeId: string) {
    await this.assertStoreExists(storeId);
    return this.productsRepo.find({
      where: { storeId, isActive: true },
      order: { name: 'ASC' },
    });
  }
}