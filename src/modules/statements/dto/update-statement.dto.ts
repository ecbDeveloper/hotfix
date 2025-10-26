import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateStatementDto } from './create-statement.dto';

export class UpdateStatementDto extends PartialType(
  OmitType(CreateStatementDto, ['userId', 'amount', 'type', 'description'] as const),
) {}