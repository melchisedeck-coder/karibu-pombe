import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ParseFloatPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateStoreDto } from './create-store.dto';
import { StoresService } from './stores.service';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  create(@Body() dto: CreateStoreDto) {
    return this.storesService.create(dto);
  }

  @Get('nearby')
  findNearby(
    @Query('lat', ParseFloatPipe) lat: number,
    @Query('lng', ParseFloatPipe) lng: number,
    @Query('radiusKm', new DefaultValuePipe(5), ParseFloatPipe) radiusKm: number,
  ) {
    return this.storesService.findNearby(lat, lng, radiusKm * 1000);
  }
}