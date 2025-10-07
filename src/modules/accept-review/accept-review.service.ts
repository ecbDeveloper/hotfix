import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateAcceptReviewDto } from './dto/create-accept-review.dto';
import { AcceptReviewRepository } from './accept-review.repository';
import { UserRole } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { ReviewRequestService } from '../review-request/review-request.service';
import { UpdateAcceptReview } from './dto/update-accept-review.dto';
import { ReviewRequestStatus } from '../review-request/entities/review-request.entity';

@Injectable()
export class AcceptReviewService {
  constructor(
    private readonly acceptReviewsRepository: AcceptReviewRepository,
    private readonly usersService: UsersService,
    private readonly reviewRequestsService: ReviewRequestService,
  ) { }

  async create(createAcceptReviewDto: CreateAcceptReviewDto) {
    const dev = await this.usersService.findOneById(createAcceptReviewDto.devId)
    if (dev.roleId != UserRole.DEVELOPER) {
      throw new UnprocessableEntityException('User need to be a Dev to accept a review request')
    }

    const review = await this.reviewRequestsService.findOneById(createAcceptReviewDto.reviewId)
    if (review.status >= ReviewRequestStatus.IN_PROGRESS) {
      throw new UnprocessableEntityException('Review need to be Open to accept it')
    }

    await this.acceptReviewsRepository.create(createAcceptReviewDto)

    return {
      devId: createAcceptReviewDto.devId,
      reviewId: createAcceptReviewDto.reviewId,
      message: 'Developer accepted a review request'
    }
  }


  async updateReviewProgress(updateAcceptReview: UpdateAcceptReview) {
    await this.usersService.findOneById(updateAcceptReview.devId)

    await this.reviewRequestsService.findOneById(updateAcceptReview.reviewId)

    await this.acceptReviewsRepository.updateAcceptReviewProgress(updateAcceptReview)

    await this.reviewRequestsService.updateReviewRequestStatus(updateAcceptReview.reviewId, updateAcceptReview.reviewStatus)

    return {
      devId: updateAcceptReview.devId,
      reviewId: updateAcceptReview.reviewId,
      message: 'accept review updated successfully'
    }
  }
}
