import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateAcceptReview } from './dto/create-accept-review.dto';
import { AcceptReviewRepository } from './accept-review.repository';
import { DevStatuses, UserRole } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { ReviewRequestService } from '../review-request/review-request.service';
import { ReviewRequestStatus } from '../review-request/entities/review-request.entity';
import { ReviewRequestGateway } from '../review-request/review-request.gateway';
import { AcceptReviewDto, AcceptReviewResponseDto } from './dto/accept-review-response.dto';
import { UpdateAcceptReviewDto } from './dto/update-accept-review.dto';
import { AcceptReviewStatuses } from './entities/accept-review.entity';

@Injectable()
export class AcceptReviewService {
  constructor(
    private readonly acceptReviewsRepository: AcceptReviewRepository,
    private readonly usersService: UsersService,
    private readonly reviewRequestsService: ReviewRequestService,
    private readonly reviewRequestsGateway: ReviewRequestGateway
  ) { }

  async create(createAcceptReview: CreateAcceptReview): Promise<AcceptReviewResponseDto> {
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

    const acceptReview = await this.acceptReviewsRepository.findInProgress(createAcceptReview.reviewId)
    if (acceptReview) {
      throw new UnprocessableEntityException("You can't accept a review alredy accepted or done")
    }

    await this.usersService.updateDevStatus(dev.id, DevStatuses.ON_REVIEW)

    await this.acceptReviewsRepository.create(createAcceptReview)

    this.reviewRequestsGateway.handlePrivateMessage(review.userId, 'accepted_review', createAcceptReview)

    return {
      devId: createAcceptReview.devId,
      reviewId: createAcceptReview.reviewId,
      message: 'Developer accepted a review request'
    }
  }


  async updateAcceptReviewStatus(updateAcceptReview: UpdateAcceptReviewDto): Promise<AcceptReviewResponseDto> {
    const review = await this.reviewRequestsService.findOneById(updateAcceptReview.reviewId)
    if (updateAcceptReview.userId !== review.userId) {
      throw new UnprocessableEntityException('To update a accept review you need to be the owner')
    }

    await this.acceptReviewsRepository.updateAcceptReviewProgress(updateAcceptReview)

    await this.reviewRequestsService.updateReviewRequestStatus(updateAcceptReview.reviewId, updateAcceptReview.reviewStatus)

    if (updateAcceptReview.acceptReviewStatus === AcceptReviewStatuses.ACCEPTED) {
      await this.acceptReviewsRepository.rejectAllPending(updateAcceptReview.reviewId)
    }

    this.reviewRequestsGateway.broadcastToRoom('work-room', 'new-review-request', review)

    return {
      devId: updateAcceptReview.devId,
      reviewId: updateAcceptReview.reviewId,
      message: 'accept review cancelled successfully'
    }
  }

  async findOneByDevAndReviewId(devId: string, reviewId: string) {
    const acceptReview = await this.acceptReviewsRepository.findOneByDevAndReviewId(reviewId, devId)
    if (!acceptReview) {
      throw new NotFoundException('Accept review not found')
    }

    return acceptReview
  }

  async findAllByDev(devId: string) {
    const dev = await this.usersService.findOneById(devId)
    if (!dev) {
      throw new NotFoundException('Dev not found')
    }

    if (dev.roleId === UserRole.CLIENT) {
      throw new NotFoundException('User need to be a Dev to see your accepts reviews')
    }

    const acceptReview = await this.acceptReviewsRepository.findAllByDev(devId)

    const acceptReviewDto = acceptReview.map(review => {
      return {
        devId: review.devId,
        reviewId: review.reviewId,
        statusId: review.statusId,
      } as AcceptReviewDto
    })

    return acceptReviewDto
  }

  async findAllPending(reviewId: string, userId: string) {
    const reviewRequest = await this.reviewRequestsService.findOneById(reviewId)
    if (reviewRequest.status >= ReviewRequestStatus.IN_PROGRESS) {
      throw new UnprocessableEntityException('The review need to be open, to see all accepts reviews')
    }

    if (reviewRequest.userId !== userId) {
      throw new UnprocessableEntityException('You need to be the review owner to see all accepts reviews')
    }

    return await this.acceptReviewsRepository.findAllPeding(reviewId)
  }

  async findOneById(acceptReviewId: string) {
    const acceptReview = await this.acceptReviewsRepository.findOneById(acceptReviewId)
    if (!acceptReview) {
      throw new NotFoundException('Accept review not found')
    }

    return acceptReview
  }

  async findOneByDevAndAcceptReviewId(devId: string, acceptReviewId: string) {
    const acceptReview = await this.acceptReviewsRepository.findOneByDevAndAcceptReviewId(acceptReviewId, devId)

    return acceptReview
  }
}
