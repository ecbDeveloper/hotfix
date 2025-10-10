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

    await this.usersService.updateDevStatus(dev.id, DevStatuses.ON_REVIEW)

    await this.reviewRequestsService.updateReviewRequestStatus(review.id, ReviewRequestStatus.IN_PROGRESS)

    await this.acceptReviewsRepository.create(createAcceptReview)

    this.reviewRequestsGateway.handlePrivateMessage(review.userId, 'accepted_review', createAcceptReview)

    return {
      devId: createAcceptReview.devId,
      reviewId: createAcceptReview.reviewId,
      message: 'Developer accepted a review request'
    }
  }


  async cancelAcceptReview(updateAcceptReview: UpdateAcceptReviewDto): Promise<AcceptReviewResponseDto> {
    const acceptReview = await this.findOne(updateAcceptReview.devId, updateAcceptReview.reviewId)

    const dev = await this.usersService.findOneById(updateAcceptReview.devId)
    if (dev.roleId !== UserRole.DEVELOPER) {
      throw new UnprocessableEntityException('User need to be a Dev to update a accept')
    }

    const review = await this.reviewRequestsService.findOneById(updateAcceptReview.reviewId)
    if (review.status !== ReviewRequestStatus.IN_PROGRESS) {
      throw new UnprocessableEntityException('Review need to be in progress to update yor status')
    }

    if (updateAcceptReview.userId !== acceptReview.devId && updateAcceptReview.userId !== review.userId) {
      throw new UnprocessableEntityException('To cancel a accept review you need to be the dev or owner')
    }

    await this.acceptReviewsRepository.updateAcceptReviewProgress(updateAcceptReview)

    await this.reviewRequestsService.updateReviewRequestStatus(updateAcceptReview.reviewId, updateAcceptReview.reviewStatus)

    this.reviewRequestsGateway.broadcastToRoom('work-room', 'new-review-request', review)

    return {
      devId: updateAcceptReview.devId,
      reviewId: updateAcceptReview.reviewId,
      message: 'accept review cancelled successfully'
    }
  }

  async findOne(devId: string, reviewId: string) {
    const acceptReview = await this.acceptReviewsRepository.findAcceptReview(reviewId, devId)
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
        inProgress: review.inProgress,
      } as AcceptReviewDto
    })

    return acceptReviewDto
  }
}
