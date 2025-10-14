import { ApiProperty } from '@nestjs/swagger';
import { Payments, ReviewRequestStatus } from '../entities/review-request.entity';
import { Languages } from 'src/common/entities/language.entity';

export class ReviewRequestDto {
  @ApiProperty({
    example: 'c8a6d2f0-8b73-4a4b-90f7-8aafcb21b221',
  })
  id: string;

  @ApiProperty({
    example: '5d3a8b5c-92b3-4a45-b1a8-7d2c7c73b4ef',
  })
  userId: string;

  @ApiProperty({
    example: 49.9,
  })
  price: number;

  @ApiProperty({
    example: 'Erro em algoritmo de ordenação',
  })
  title: string;

  @ApiProperty({
    example: 'O algoritmo Bubble Sort não está ordenando corretamente a lista.',
  })
  description: string;

  @ApiProperty({
    example: 'function bubbleSort(arr) { ... }',
  })
  codeSnippet: string;

  @ApiProperty({
    enum: ReviewRequestStatus,
    example: ReviewRequestStatus.IN_PROGRESS,
  })
  status: ReviewRequestStatus;

  @ApiProperty({
    enum: Languages,
    example: 1,
  })
  language: Languages;

  @ApiProperty({
    enum: Payments,
    example: Payments.PIX,
  })
  paymentMethod: Payments;

  @ApiProperty({
    example: '2025-10-14T12:34:56.000Z',
  })
  createdAt?: Date;

  @ApiProperty({
    example: '2025-10-14T12:34:56.000Z',
  })
  updatedAt?: Date;
}
