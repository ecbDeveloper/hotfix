import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Languages } from 'src/common/entities/language.entity';
import { DevStatuses, UserRole } from 'src/modules/users/entities/user.entity';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Jack'
  })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Frosty'
  })
  lastName: string;

  @IsEmail()
  @ApiProperty({
    example: 'example@gmail.com'
  })
  email: string;

  @MinLength(8, { message: 'password must be at least 8 characters' })
  @ApiProperty({
    example: 'password123'
  })
  password: string;

  @IsNumber()
  @IsNotEmpty()
  @IsEnum(UserRole, { message: "role must be 1 (Client) or 2 (Developer)" })
  @ApiProperty({ enum: UserRole })
  roleId: UserRole;

  @IsArray()
  @ArrayMinSize(1)
  @IsEnum(Languages, { each: true })
  @ApiProperty({ type: [Number], example: [1, 3, 6], minItems: 1 })
  languages: number[]

  @IsOptional()
  @IsNumber()
  @IsEnum(DevStatuses)
  devStatusId?: DevStatuses
}
