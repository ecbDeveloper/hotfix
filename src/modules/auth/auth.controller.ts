import { Body, Controller, Post, Res } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginResponse } from './dto/login-response.dto';
import { DefaultResponse } from 'src/common/dto/default-response.dto';
import type { Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @ApiOkResponse({
    description: "User logged in successfully",
    type: LoginResponse
  })
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const response = await this.authService.login(loginDto);

    res.status(200).json(response)
  }

  @Post('signup')
  @ApiCreatedResponse({
    description: "User created successfully",
    type: DefaultResponse,
  })
  async signup(@Body() signupDto: SignupDto) {
    return await this.authService.signup(signupDto);
  }
}
