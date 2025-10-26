import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { ReviewRequestStatus } from '../entities/review-request.entity';

export class ReviewRequestDto {
  @ApiProperty({
    example: '2b1c4e5f-3a67-4d9a-8e12-1b3456789abc',
    description: 'Review request unique identifier'
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    example: '9d7e6c5b-4a32-1f09-8e76-5c4b3a2d1f0e',
    description: 'ID of the user who created the review request'
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    example: 'Code Review: Authentication Service',
    description: 'Title of the review request'
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Need review of the new authentication service implementation...',
    description: 'Detailed description of what needs to be reviewed'
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 50.00,
    description: 'The price for the review'
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: 'function authenticate() { ... }',
    description: 'The code snippet to be reviewed'
  })
  @IsString()
  @IsNotEmpty()
  codeSnippet: string;

  @ApiProperty({
    enum: ReviewRequestStatus,
    example: ReviewRequestStatus.OPEN,
    description: 'Current status of the review request'
  })
  @IsEnum(ReviewRequestStatus)
  @IsNotEmpty()
  status: ReviewRequestStatus;

  @ApiProperty({
    example: 1,
    description: 'The programming language ID'
  })
  @IsNumber()
  @IsNotEmpty()
  language: number;

  @ApiProperty({
    example: 1,
    description: 'The payment method ID'
  })
  @IsNumber()
  @IsNotEmpty()
  paymentMethod: number;
  @ApiProperty({
    example: '2025-10-16T19:20:30.451Z',
    description: 'When the review request was created'
  })
  createdAt: Date;

  @ApiProperty({
    example: '2025-10-16T19:20:30.451Z',
    description: 'When the review request was last updated'
  })
  updatedAt: Date;
}