import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Store } from '../stores/store.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'varchar', nullable: true })
  brand: string | null;

  @Column({ type: 'int' })
  volumeMl: number;

  // Price in whole Tanzanian shillings
  @Column({ type: 'int' })
  priceTzs: number;

  @Column({ type: 'int', default: 0 })
  stockQty: number;

  @Column({ default: true })
  isActive: boolean;

  @Index()
  @Column({ type: 'uuid' })
  storeId: string;

  @ManyToOne(() => Store, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'storeId' })
  store: Store;
}