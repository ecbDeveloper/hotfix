import { forwardRef, Module } from '@nestjs/common';
import { ReviewRequestService } from './review-request.service';
import { ReviewRequestController } from './review-request.controller';
import { ReviewRequestRepository } from './review-request.repository';
import { UsersModule } from '../users/users.module';
import { ReviewRequestGateway } from './review-request.gateway';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReviewRequest } from './entities/review-request.entity';
import { ReviewStatus } from 'src/common/entities/review-status.entity';
import { PaymentMethods } from 'src/common/entities/payment-method.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([ReviewRequest, ReviewStatus, PaymentMethods]),
    forwardRef(() => UsersModule),
  ],
  controllers: [ReviewRequestController],
  providers: [ReviewRequestService, ReviewRequestRepository, ReviewRequestGateway],
  exports: [ReviewRequestGateway, ReviewRequestService]
})
export class ReviewRequestModule { }
