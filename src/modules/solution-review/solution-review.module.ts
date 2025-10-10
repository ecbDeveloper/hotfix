import { Module } from '@nestjs/common';
import { SolutionReviewService } from './solution-review.service';
import { SolutionReviewController } from './solution-review.controller';

@Module({
  controllers: [SolutionReviewController],
  providers: [SolutionReviewService],
})
export class SolutionReviewModule {}
