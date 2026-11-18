import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

export type GeoPoint = {
  type: 'Point';
  coordinates: [number, number]; // [longitude, latitude]
};

@Entity('stores')
export class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  address: string | null;

  @Index({ spatial: true })
  @Column({ type: 'geography', spatialFeatureType: 'Point', srid: 4326 })
  location: GeoPoint;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isLicenseVerified: boolean;
}