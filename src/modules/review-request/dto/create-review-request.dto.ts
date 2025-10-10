import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { Payments } from '../entities/review-request.entity';
import { Languages } from 'src/common/entities/language.entity';

export class CreateReviewRequestDto {
  @ApiProperty({
    example: 99.9,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsOptional()
  @IsUUID('4')
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
    example: Languages.GO,
  })
  @IsEnum(Languages)
  @IsNotEmpty()
  language: Languages;

  @ApiProperty({
    example: Payments.PIX,
  })
  @IsEnum(Payments)
  @IsNotEmpty()
  paymentMethod: Payments;
}
