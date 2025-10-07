import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateAcceptReview } from './dto/create-accept-review.dto';
import { AcceptReviewRepository } from './accept-review.repository';
import { DevStatuses, UserRole } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { ReviewRequestService } from '../review-request/review-request.service';
import { UpdateAcceptReview } from './dto/update-accept-review.dto';
import { ReviewRequestStatus } from '../review-request/entities/review-request.entity';
import { AcceptReviewResponse } from './dto/accept-review-response.dto';

@Injectable()
export class AcceptReviewService {
  constructor(
    private readonly acceptReviewsRepository: AcceptReviewRepository,
    private readonly usersService: UsersService,
    private readonly reviewRequestsService: ReviewRequestService,
  ) { }

  async create(createAcceptReview: CreateAcceptReview): Promise<AcceptReviewResponse> {
    const dev = await this.usersService.findOneById(createAcceptReview.devId)
    if (dev.roleId != UserRole.DEVELOPER) {
      throw new UnprocessableEntityException('User need to be a Dev to accept a review request')
    }

    if (dev.devStatusId === DevStatuses.RESTING || dev.devStatusId === DevStatuses.ON_REVIEW) {
      throw new UnprocessableEntityException('Dev need to be working and free to accept a review request')
    }

    const review = await this.reviewRequestsService.findOneById(createAcceptReview.reviewId)
    if (review.status >= ReviewRequestStatus.IN_PROGRESS) {
      throw new UnprocessableEntityException('Review need to be Open to accept it')
    }

    if (dev.id === review.userId) {
      throw new UnprocessableEntityException("A dev can't accept your own review")
    }

    await this.acceptReviewsRepository.create(createAcceptReview)

    return {
      devId: createAcceptReview.devId,
      reviewId: createAcceptReview.reviewId,
      message: 'Developer accepted a review request'
    }
  }


  async cancelAcceptReview(updateAcceptReview: UpdateAcceptReview): Promise<AcceptReviewResponse> {
    const dev = await this.usersService.findOneById(updateAcceptReview.devId)
    if (dev.roleId !== UserRole.DEVELOPER) {
      throw new UnprocessableEntityException('User need to be a Dev to update a accept')
    }

    const review = await this.reviewRequestsService.findOneById(updateAcceptReview.reviewId)
    if (review.status !== ReviewRequestStatus.IN_PROGRESS) {
      throw new UnprocessableEntityException('Review need to be in progress to update yor status')
    }

    await this.acceptReviewsRepository.updateAcceptReviewProgress(updateAcceptReview)

    await this.reviewRequestsService.updateReviewRequestStatus(updateAcceptReview.reviewId, updateAcceptReview.reviewStatus)

    return {
      devId: updateAcceptReview.devId,
      reviewId: updateAcceptReview.reviewId,
      message: 'accept review updated successfully'
    }
  }
}
