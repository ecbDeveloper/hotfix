import { IsString, IsNumber, IsOptional, IsEnum, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StatementType, StatementStatus } from '../../../common/entities/statement.entity';

export class CreateStatementDto {
  @ApiProperty({
    description: 'User ID associated with the statement',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'Amount of the transaction',
    example: 100.50,
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'Type of statement (credit/debit)',
    enum: StatementType,
    example: StatementType.CREDIT,
  })
  @IsEnum(StatementType)
  type: StatementType;

  @ApiProperty({
    description: 'Status of the statement',
    enum: StatementStatus,
    example: StatementStatus.PENDING,
  })
  @IsEnum(StatementStatus)
  status: StatementStatus;

  @ApiProperty({
    description: 'Description of the transaction',
    example: 'Payment for code review #123',
  })
  @IsString()
  description: string;

  @ApiPropertyOptional({
    description: 'Reference ID (e.g., review request ID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsOptional()
  referenceId?: string;

  @ApiPropertyOptional({
    description: 'Reference type (e.g., review_request)',
    example: 'review_request',
  })
  @IsString()
  @IsOptional()
  referenceType?: string;

  @ApiPropertyOptional({
    description: 'Additional metadata for the statement',
    example: { paymentMethod: 'credit_card', transactionId: '123456' },
  })
  @IsOptional()
  metadata?: Record<string, any>;
}