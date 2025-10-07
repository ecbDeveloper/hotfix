import { forwardRef, Module } from '@nestjs/common';
import { ReviewRequestService } from './review-request.service';
import { ReviewRequestController } from './review-request.controller';
import { ReviewRequestRepository } from './review-request.repository';
import { UsersModule } from '../users/users.module';
import { ReviewRequestGateway } from './review-request.gateway';

@Module({
  imports: [forwardRef(() => UsersModule)],
  controllers: [ReviewRequestController],
  providers: [ReviewRequestService, ReviewRequestRepository, ReviewRequestGateway],
  exports: [ReviewRequestGateway, ReviewRequestService]
})
export class ReviewRequestModule { }
