import { Module } from '@nestjs/common';
import { AcceptReviewService } from './accept-review.service';
import { AcceptReviewRepository } from './accept-review.repository';
import { ReviewRequestModule } from '../review-request/review-request.module';
import { UsersModule } from '../users/users.module';
import { AcceptReviewController } from './accept-review.controller';

@Module({
  controllers: [AcceptReviewController],
  providers: [AcceptReviewService, AcceptReviewRepository],
  imports: [ReviewRequestModule, UsersModule],
  exports: [AcceptReviewService]
})
export class AcceptReviewModule { }
