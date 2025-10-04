import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from 'src/modules/users/entities/user.entity';

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
  @IsInt({ each: true })
  @ArrayMinSize(1)
  @ApiProperty({ type: [Number], example: [1, 3, 6], minItems: 1 })
  languages: number[]
}
