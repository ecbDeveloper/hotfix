import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSystemConfigDto {
  @ApiProperty({
    description: 'Unique key for the system configuration',
    example: 'app.maintenance',
  })
  @IsString()
  key: string;

  @ApiProperty({
    description: 'Value of the system configuration',
    example: 'true',
  })
  @IsString()
  value: string;

  @ApiPropertyOptional({
    description: 'Description of what this configuration does',
    example: 'Controls whether the application is in maintenance mode',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Whether this configuration is publicly accessible',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;
}