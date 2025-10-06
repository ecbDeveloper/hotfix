import { ConflictException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewRequestDto } from './dto/create-review-request.dto';
import { ReviewRequestRepository } from './review-request.repository';
import { DefaultResponse } from 'src/common/dto/default-response.dto';
import { UsersService } from '../users/users.service';
import { ReviewRequestGateway } from './review-request.gateway';

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
      throw new ConflictException('You already an review in progess')
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

  findOne(id: number) {
    return `This action returns a #${id} reviewRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} reviewRequest`;
  }
}
