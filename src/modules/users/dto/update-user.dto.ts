import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Languages } from 'src/common/entities/language.entity';
import { DevStatuses } from '../entities/user.entity';

export class UpdateUserDto {
  @IsOptional()
  userId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ type: [Number], example: [1, 3, 6], minItems: 1 })
  @IsArray()
  @IsInt({ each: true })
  @ArrayMinSize(1)
  languages: Languages[]
}

export class UpdateDevStatusDto {
  @IsInt()
  @ApiProperty({
    example: DevStatuses.RESTING
  })
  status: DevStatuses
}
