import { Module } from '@nestjs/common';
import { ReviewRequestService } from './review-request.service';
import { ReviewRequestController } from './review-request.controller';

@Module({
  controllers: [ReviewRequestController],
  providers: [ReviewRequestService],
})
export class ReviewRequestModule {}
