import { Module } from '@nestjs/common';
import { ReviewRequestService } from './review-request.service';
import { ReviewRequestController } from './review-request.controller';
import { ReviewRequestRepository } from './review-request.repository';

@Module({
  controllers: [ReviewRequestController],
  providers: [ReviewRequestService, ReviewRequestRepository],
})
export class ReviewRequestModule { }
