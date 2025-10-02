import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UserRole } from 'src/users/entities/user.entity';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNumber()
  @IsNotEmpty()
  role: UserRole;
}
