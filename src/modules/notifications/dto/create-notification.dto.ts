import { IsNotEmpty, IsString, IsUUID, IsOptional, IsObject, IsEnum } from 'class-validator';
import { NotificationType } from '../../../common/entities/notification.entity';

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsEnum(NotificationType)
  type: NotificationType;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}