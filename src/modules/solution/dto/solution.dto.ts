import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class SolutionDto {
  @ApiProperty()
  @IsUUID()
  id?: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  acceptReviewId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  solution: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  acceptedSolution?: boolean;

  @ApiProperty({
    example: '2025-10-14T12:34:56.000Z',
  })
  createdAt?: Date;

  @ApiProperty({
    example: '2025-10-14T12:34:56.000Z',
  })
  updatedAt?: Date;
}

