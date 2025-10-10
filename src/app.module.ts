import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthController } from './modules/auth/auth.controller';
import { UsersService } from './modules/users/users.service';
import { UsersRepository } from './modules/users/users.repository';
import { AuthService } from './modules/auth/auth.service';
import { UsersController } from './modules/users/users.controller';
import { ReviewRequestModule } from './modules/review-request/review-request.module';
import { AcceptReviewModule } from './modules/accept-review/accept-review.module';
import { SolutionReviewModule } from './modules/solution-review/solution-review.module';

@Module({
  imports: [UsersModule, AuthModule, ReviewRequestModule, AcceptReviewModule, SolutionReviewModule],
  controllers: [UsersController, AuthController],
  providers: [UsersService, UsersRepository, AuthService],
})
export class AppModule { }
