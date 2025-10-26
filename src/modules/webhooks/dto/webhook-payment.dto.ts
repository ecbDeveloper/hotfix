import { IsString, IsNumber, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WebhookPaymentDto {
  @ApiProperty({
    description: 'User ID associated with the payment',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'Amount of the payment',
    example: 100.50,
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'Payment ID from the payment provider',
    example: 'pay_123456789',
  })
  @IsString()
  paymentId: string;

  @ApiProperty({
    description: 'Payment method used',
    example: 'credit_card',
  })
  @IsString()
  paymentMethod: string;

  @ApiProperty({
    description: 'Reference ID (e.g., review request ID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  referenceId: string;

  @ApiProperty({
    description: 'External reference number from payment provider',
    example: 'ext_123456789',
  })
  @IsString()
  externalReference: string;
}