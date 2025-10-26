import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { DefaultResponse } from 'src/common/dto/default-response.dto';
import { SolutionRepository } from './solution.repository';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { AcceptReviewStatuses } from '../accept-review/entities/accept-review.entity';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/entities/user.entity';
import { AcceptReviewService } from '../accept-review/accept-review.service';
import { ReviewRequestService } from '../review-request/review-request.service';
import { ReviewRequestStatus } from '../review-request/entities/review-request.entity';
import { UpdateAcceptReviewDto } from '../accept-review/dto/update-accept-review.dto';
import { AcceptSolutionDto } from './dto/accept-solution.dto';

@Injectable()
export class SolutionService {
  constructor(
    private readonly solutionRepository: SolutionRepository,
    private readonly reviewRequestService: ReviewRequestService,
    private readonly acceptReviewsService: AcceptReviewService,
    private readonly usersService: UsersService,
  ) { }

  async create(createSolutionDto: CreateSolutionDto): Promise<DefaultResponse> {
    const dev = await this.usersService.findOneById(createSolutionDto.devId)
    if (dev.roleId === UserRole.CLIENT) {
      throw new UnprocessableEntityException('To send a solution you need to be a dev')
    }

    const alreadyExistsReviewSolution = await this.solutionRepository.findOneByAcceptReview(createSolutionDto.acceptReviewId)
    if (alreadyExistsReviewSolution) {
      throw new UnprocessableEntityException('Review request can have only one solution')
    }

    const acceptReview = await this.acceptReviewsService.findOneByDevAndAcceptReviewId(createSolutionDto.acceptReviewId, createSolutionDto.devId)
    if (!acceptReview) {
      throw new UnprocessableEntityException('To send solution to a review request, you need to accept it')
    }

    if (acceptReview.statusId !== AcceptReviewStatuses.ACCEPTED) {
      throw new UnprocessableEntityException('User needs to accept dev, to send solution')
    }

    const solution = await this.solutionRepository.create(createSolutionDto)

    return {
      id: solution.id,
      message: 'solution created successfully'
    }
  }

  async acceptSolution(acceptSolutionDto: AcceptSolutionDto): Promise<DefaultResponse> {
    const solution = await this.findOneById(acceptSolutionDto.solutionId)

    const acceptReview = await this.acceptReviewsService.findOneById(solution.acceptReviewId)

    const review = await this.reviewRequestService.findOneById(acceptReview.reviewId)
    if (review.userId !== acceptSolutionDto.userId) {
      throw new UnprocessableEntityException('You need to be the review owner to accept solution')
    }

    await this.reviewRequestService.updateReviewRequestStatus(acceptReview.reviewId, ReviewRequestStatus.DONE)

    const updateAcceptReview: UpdateAcceptReviewDto = {
      acceptReviewStatus: AcceptReviewStatuses.COMPLETED,
      reviewStatus: ReviewRequestStatus.DONE,
      devId: acceptReview.devId,
      userId: acceptSolutionDto.userId,
      reviewId: review.id
    }
    await this.acceptReviewsService.updateAcceptReviewStatus(updateAcceptReview)

    await this.solutionRepository.acceptSolution(acceptSolutionDto.solutionId)

    return {
      id: review.id,
      message: 'Review finished successfully'
    }
  }

  async updateSolution(solution: string, solutionId: string, devId: string): Promise<DefaultResponse> {
    const solutionExists = await this.solutionRepository.findOneById(solutionId)
    if (!solutionExists) {
      throw new NotFoundException('Solution not found')
    }

    const acceptReview = await this.acceptReviewsService.findOneById(solutionExists.acceptReviewId)

    if (solutionExists.acceptedSolution === true) {
      throw new UnprocessableEntityException('You cant change solution already done')
    }

    if (acceptReview.devId !== devId) {
      throw new UnprocessableEntityException('To update the solution you need to be the owner dev')
    }

    await this.solutionRepository.updateSolution(solutionId, solution)

    return {
      id: solutionId,
      message: "solution updated successfully"
    }
  }

  async findOneById(solutionId: string) {
    const solution = await this.solutionRepository.findOneById(solutionId)
    if (!solution) {
      throw new NotFoundException('Solution not found')
    }

    return solution
  }

  async findOneByReview(reviewId: string) {
    const solution = await this.solutionRepository.findOneByReview(reviewId);
    return solution;
  }
}
