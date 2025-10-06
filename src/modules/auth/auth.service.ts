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
import { DevStatuses, UserRole } from '../users/entities/user.entity';

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
      throw new ConflictException('Email is already in use');
    }

    let hashedPassword: string;
    try {
      hashedPassword = await brcrypt.hash(userData.password, 10);
    } catch (error) {
      console.error('failed to hash password: ', error);
      throw new InternalServerErrorException(
        'Unexpected internal server error',
      );
    }

    if (signUpDto.roleId == UserRole.DEVELOPER) {
      userData.devStatusId = DevStatuses.RESTING
    }

    const id = await this.usersService.create({
      ...userData,
      password: hashedPassword,
    });

    await this.usersService.insertLanguages(id, languages)

    return { message: 'User created successfully', id };
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const user = await this.usersService.findOneByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await brcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokenPayload = { sub: user.id };
    const token = await this.jwtService.signAsync(tokenPayload);

    return { message: 'User logged successfully', token, userId: user.id };
  }
}
