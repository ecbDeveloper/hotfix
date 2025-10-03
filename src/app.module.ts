import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthController } from './modules/auth/auth.controller';
import { UsersService } from './modules/users/users.service';
import { UsersRepository } from './modules/users/users.repository';
import { AuthService } from './modules/auth/auth.service';
import { UsersController } from './modules/users/users.controller';
import { ReviewRequestModule } from './modules/review-request/review-request.module';

@Module({
  imports: [UsersModule, AuthModule, ReviewRequestModule],
  controllers: [UsersController, AuthController],
  providers: [UsersService, UsersRepository, AuthService],
})
export class AppModule { }
