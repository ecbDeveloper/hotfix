import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsEnum, IsOptional } from 'class-validator';
import { Payments } from '../entities/review-request.entity';

export class CreateReviewRequestDto {
  @ApiProperty({
    example: 99.9,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsOptional()
  userId: string;

  @ApiProperty({
    example: 'Improve performance of Go code',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: "This code has a lot of problems, solve to me"
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 'package main\n\nfunc main() {\n  // code here\n}',
  })
  @IsString()
  @IsNotEmpty()
  codeSnippet: string;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  language: number;

  @ApiProperty({
    example: Payments.PIX,
  })
  @IsEnum(Payments)
  @IsNotEmpty()
  paymentMethod: Payments;
}
