import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class SolutionDto {
  @ApiProperty()
  @IsUUID()
  id?: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  reviewId: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  devId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  solution: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  acceptedSolution?: boolean;
}

