import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import * as brcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './dto/login-response.dto';
import { UsersService } from '../users/users.service';
import { DefaultResponse } from 'src/common/dto/default-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async signup(signUpDto: SignupDto): Promise<DefaultResponse> {
    const { languages, ...userData } = signUpDto;

    const user = await this.usersService.findOneByEmail(userData.email);
    if (user) {
      throw new ConflictException('email is already in use');
    }

    let hashedPassword: string;
    try {
      hashedPassword = await brcrypt.hash(userData.password, 10);
    } catch (error) {
      console.error('failed to hash password: ', error);
      throw new InternalServerErrorException(
        'unexpected internal server error',
      );
    }

    const id = await this.usersService.create({
      ...userData,
      password: hashedPassword,
    });

    await this.usersService.insertLanguages(id, languages)

    return { message: 'user created successfully', id };
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const user = await this.usersService.findOneByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('invalid credentials');
    }

    const plainUser = user.get()

    const passwordMatches = await brcrypt.compare(
      loginDto.password,
      plainUser.password,
    );
    if (!passwordMatches) {
      throw new UnauthorizedException('invalid credentials');
    }

    const tokenPayload = { sub: user.id };
    const token = await this.jwtService.signAsync(tokenPayload);

    return { message: 'user logged successfully', token };
  }
}
