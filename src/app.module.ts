import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthController } from './modules/auth/auth.controller';
import { UsersService } from './modules/users/users.service';
import { UsersRepository } from './modules/users/users.repository';
import { AuthService } from './modules/auth/auth.service';
import { UsersController } from './modules/users/users.controller';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [UsersController, AuthController],
  providers: [UsersService, UsersRepository, AuthService],
})
export class AppModule { }
