import { ConflictException, forwardRef, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateReviewRequestDto } from './dto/create-review-request.dto';
import { ReviewRequestRepository } from './review-request.repository';
import { DefaultResponse } from 'src/common/dto/default-response.dto';
import { UsersService } from '../users/users.service';
import { ReviewRequestGateway } from './review-request.gateway';
import { PaginatedDto } from 'src/common/dto/paginated-response.dto';
import { ReviewRequestDto } from './dto/response-review-request.dto';
import { ReviewRequestStatus } from './entities/review-request.entity';

@Injectable()
export class ReviewRequestService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly reviewResquestRepository: ReviewRequestRepository,
    private readonly reviewRequestGateway: ReviewRequestGateway,
  ) { }

  async create(createReviewRequestDto: CreateReviewRequestDto): Promise<DefaultResponse> {
    const userHasReviewInProgress = await this.reviewResquestRepository.findReviewRequestInProgressByUser(createReviewRequestDto.userId)
    if (userHasReviewInProgress) {
      throw new ConflictException('You already have a review in progess')
    }

    const user = await this.usersService.findOneById(createReviewRequestDto.userId)
    if (!user) {
      throw new NotFoundException('User not found')
    }

    const reviewId = await this.reviewResquestRepository.create(createReviewRequestDto)

    this.reviewRequestGateway.broadcastToRoom('work-room', 'newReviewRequest', createReviewRequestDto)

    return {
      id: reviewId,
      message: 'Review request created successfully',
    }
  }

  async findOneById(reviewId: string) {
    const review = await this.reviewResquestRepository.findOneById(reviewId)
    if (!review) {
      throw new NotFoundException('Review request not found')
    }

    return review
  }

  async updateReviewRequestStatus(reviewId: string, status: number) {
    return await this.reviewResquestRepository.updateReviewRequestStatus(reviewId, status)
  }

  async findAllByUserId(userId: string, limit: number, offset: number): Promise<PaginatedDto<ReviewRequestDto>> {
    const { results, total } = await this.reviewResquestRepository.findAllByUserId(userId, limit, offset)

    const dtoResult = results.map(review => {
      return {
        id: review.id,
        userId: review.userId,
        title: review.title,
        paymentMethod: review.paymentMethod,
        status: review.status
      } as ReviewRequestDto
    })

    return {
      results: dtoResult,
      total,
      limit,
      offset
    }
  }

  async checkOwnerAndCancel(reviewId: string, ownerId: string): Promise<DefaultResponse> {
    const review = await this.findOneById(reviewId)
    if (!review) {
      throw new NotFoundException('Review not found')
    }

    if (review.userId !== ownerId) {
      throw new UnauthorizedException('User must to be the review owner to cancel it')
    }

    await this.updateReviewRequestStatus(reviewId, ReviewRequestStatus.CANCELLED)

    return {
      id: reviewId,
      message: "Review request cancelled successfully"
    }
  }
}
