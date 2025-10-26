import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateChatRoomDto {
  @ApiProperty({
    description: 'ID do pedido de review',
    example: '2b1c4e5f-3a67-4d9a-8e12-1b3456789abc'
  })
  @IsUUID()
  @IsNotEmpty()
  reviewId: string;

  @ApiProperty({
    description: 'ID do desenvolvedor',
    example: '9d7e6c5b-4a32-1f09-8e76-5c4b3a2d1f0e'
  })
  @IsUUID()
  @IsNotEmpty()
  devId: string;
}

export class CreateChatMessageDto {
  @ApiProperty({
    description: 'Conteúdo da mensagem',
    example: 'Olá, pode me explicar melhor sobre o código?'
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}

export class UpdateChatMessageDto {
  @ApiProperty({
    description: 'Novo conteúdo da mensagem',
    example: 'Olá, pode me explicar melhor sobre o código? (editado)'
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}