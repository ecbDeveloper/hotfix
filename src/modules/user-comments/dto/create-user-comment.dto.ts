import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, MinLength } from 'class-validator';

export class CreateUserCommentDto {
  @ApiProperty({
    description: 'ID do usuário que está fazendo o comentário',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'ID do usuário que está recebendo o comentário',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID()
  targetUserId: string;

  @ApiProperty({
    description: 'Conteúdo do comentário',
    example: 'Excelente desenvolvedor, muito profissional!'
  })
  @IsString()
  @MinLength(1)
  content: string;
}