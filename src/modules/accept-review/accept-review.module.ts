import { Module } from '@nestjs/common';
import { AcceptReviewService } from './accept-review.service';
import { AcceptReviewRepository } from './accept-review.repository';
import { ReviewRequestModule } from '../review-request/review-request.module';
import { UsersModule } from '../users/users.module';
import { AcceptReviewController } from './accept-review.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AcceptReview } from './entities/accept-review.entity';
import { AcceptReviewStatus } from 'src/common/entities/accept-review-status.entity';

@Module({
  controllers: [AcceptReviewController],
  providers: [AcceptReviewService, AcceptReviewRepository],
  imports: [
    SequelizeModule.forFeature([AcceptReview, AcceptReviewStatus]),
    ReviewRequestModule,
    UsersModule
  ],
  exports: [AcceptReviewService]
})
export class AcceptReviewModule { }
