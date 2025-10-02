import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from 'src/modules/users/entities/user.entity';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @MinLength(8, { message: 'password must be at least 8 characters' })
  password: string;

  @IsNumber()
  @IsNotEmpty()
  @IsIn([UserRole.CLIENT, UserRole.DEVELOPER], { message: "role must be 1 (Client) or 2 (Developer)" })
  roleId: UserRole;
}
