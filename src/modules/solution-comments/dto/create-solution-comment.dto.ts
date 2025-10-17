import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, MinLength } from 'class-validator';

export class CreateSolutionCommentDto {
  @ApiProperty({
    description: 'ID da solução à qual o comentário pertence',
    example: '1e9a2c1d-6f3a-4baf-bb52-98df2b22f111',
  })
  @IsUUID()
  solutionId: string;

  @ApiProperty({
    description: 'Conteúdo do comentário',
    example: 'Excelente explicação na sua solução!',
  })
  @IsString()
  @MinLength(1)
  comment: string;

  @IsUUID()
  userId: string;
}
