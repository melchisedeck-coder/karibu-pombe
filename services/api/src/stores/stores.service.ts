import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStoreDto } from './create-store.dto';
import { Store } from './store.entity';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private readonly storesRepo: Repository<Store>,
  ) {}

  create(dto: CreateStoreDto) {
    const store = this.storesRepo.create({
      name: dto.name,
      address: dto.address ?? null,
      // GeoJSON order is [longitude, latitude]
      location: { type: 'Point', coordinates: [dto.longitude, dto.latitude] },
    });
    return this.storesRepo.save(store);
  }

  findNearby(lat: number, lng: number, radiusMeters: number) {
    return this.storesRepo.query(
      `SELECT id, name, address, "isLicenseVerified",
              ST_AsGeoJSON(location)::json AS location,
              ST_Distance(location, ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography) AS "distanceMeters"
       FROM stores
       WHERE "isActive" = true
         AND ST_DWithin(location, ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography, $3)
       ORDER BY "distanceMeters" ASC`,
      [lng, lat, radiusMeters],
    );
  }
}