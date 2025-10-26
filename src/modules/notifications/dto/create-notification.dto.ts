import { IsNotEmpty, IsString, IsUUID, IsOptional, IsObject, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { NotificationType } from '../../../common/entities/notification.entity';

export class CreateNotificationDto {
  @ApiProperty({ description: 'ID do usuário que receberá a notificação' })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({ 
    description: 'Tipo da notificação',
    enum: NotificationType 
  })
  @IsNotEmpty()
  @IsEnum(NotificationType)
  type: NotificationType;

  @ApiProperty({ description: 'Título da notificação' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Mensagem da notificação' })
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiProperty({ 
    description: 'Dados adicionais da notificação em formato JSON',
    required: false,
    type: Object,
    additionalProperties: true
  })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}