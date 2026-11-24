import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  brand?: string;

  @IsInt()
  @Min(1)
  volumeMl: number;

  @IsInt()
  @Min(1)
  priceTzs: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  stockQty?: number;
}