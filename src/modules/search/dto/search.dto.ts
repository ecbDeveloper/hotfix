import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Languages } from 'src/common/entities/language.entity';

export class SearchDevsDto {
  @ApiProperty({
    description: 'Array de IDs das linguagens de programação',
    example: [1, 2],
    required: false,
    type: [Number]
  })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  languages?: number[];

  @ApiProperty({
    description: 'Nota mínima do desenvolvedor',
    example: 4.5,
    required: false
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  minRating?: number;

  @ApiProperty({
    description: 'Status do desenvolvedor',
    example: 1,
    required: false
  })
  @IsNumber()
  @IsOptional()
  devStatus?: number;
}

export class SearchReviewsDto {
  @ApiProperty({
    description: 'Array de IDs das linguagens de programação',
    example: [1, 2],
    required: false,
    type: [Number]
  })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  languages?: number[];

  @ApiProperty({
    description: 'Preço mínimo',
    example: 50,
    required: false
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  minPrice?: number;

  @ApiProperty({
    description: 'Preço máximo',
    example: 200,
    required: false
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  maxPrice?: number;
}

export class SearchSolutionsDto {
  @ApiProperty({
    description: 'Texto para buscar nas soluções',
    example: 'authentication',
    required: false
  })
  @IsString()
  @IsOptional()
  searchText?: string;

  @ApiProperty({
    description: 'Array de IDs das linguagens de programação',
    example: [1, 2],
    required: false,
    type: [Number]
  })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  languages?: number[];
}