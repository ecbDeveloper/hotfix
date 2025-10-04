import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class LoginDto {
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
}
