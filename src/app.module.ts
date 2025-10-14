import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ReviewRequestModule } from './modules/review-request/review-request.module';
import { AcceptReviewModule } from './modules/accept-review/accept-review.module';
import { SolutionModule } from './modules/solution/solution.module';

@Module({
  imports: [UsersModule, AuthModule, ReviewRequestModule, AcceptReviewModule, SolutionModule],
})
export class AppModule { }
