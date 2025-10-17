import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { DefaultResponse } from 'src/common/dto/default-response.dto';
import { PaginatedDto } from 'src/common/dto/paginated-response.dto';
import { ReviewRequestRepository } from './review-request.repository';
import { CreateReviewRequestDto } from './dto/create-review-request.dto';
import { ReviewRequestDto } from './dto/review-request.dto.js';
import { User } from '../users/entities/user.entity';
import { ReviewRequest, ReviewRequestStatus } from './entities/review-request.entity';
import { ReviewRequestGateway } from './review-request.gateway';

@Injectable()
export class ReviewRequestService {
  constructor(
    private readonly reviewResquestRepository: ReviewRequestRepository,
    private readonly reviewRequestGateway: ReviewRequestGateway
  ) {}

  async create(createReviewRequestDto: CreateReviewRequestDto, user: User): Promise<DefaultResponse> {
    if (user.id !== createReviewRequestDto.userId) {
      throw new UnprocessableEntityException('User can only create review requests for themselves');
    }

    const review = await this.reviewResquestRepository.create(createReviewRequestDto);

    return {
      id: review,
      message: 'Review request created successfully'
    };
  }

  async findAll(limit?: number, offset?: number): Promise<PaginatedDto<ReviewRequestDto>> {
    const { results, total } = await this.reviewResquestRepository.findAll(limit, offset);

    const dtoResults = results.map(review => ({
      id: review.id,
      userId: review.userId,
      title: review.title,
      description: review.description,
      price: review.price,
      codeSnippet: review.codeSnippet,
      status: review.status,
      language: review.language,
      paymentMethod: review.paymentMethod,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt
    }));

    return {
      results: dtoResults,
      total,
      limit: limit || 10,
      offset: offset || 0
    };
  }

  async findByUser(userId: string, limit?: number, offset?: number): Promise<PaginatedDto<ReviewRequestDto>> {
    const { results, total } = await this.reviewResquestRepository.findAllByUserId(userId, limit, offset);

    const dtoResult = results.map(review => ({
      id: review.id,
      userId: review.userId,
      title: review.title,
      description: review.description,
      price: review.price,
      codeSnippet: review.codeSnippet,
      status: review.status,
      language: review.language,
      paymentMethod: review.paymentMethod,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt
    }));

    return {
      results: dtoResult,
      total,
      limit: limit || 10,
      offset: offset || 0
    };
  }

  async findOneById(reviewId: string): Promise<ReviewRequest | null> {
    return await this.reviewResquestRepository.findOneById(reviewId);
  }

  async updateReviewRequestStatus(reviewId: string, status: ReviewRequestStatus): Promise<void> {
    await this.reviewResquestRepository.updateReviewRequestStatus(reviewId, status);
  }

  async checkOwnerAndCancel(reviewId: string, userId: string): Promise<DefaultResponse> {
    const review = await this.findOneById(reviewId);
    if (!review) {
      throw new UnprocessableEntityException('Review request not found');
    }

    if (review.userId !== userId) {
      throw new UnprocessableEntityException('Only the owner can cancel this review request');
    }

    if (review.status === ReviewRequestStatus.DONE) {
      throw new UnprocessableEntityException('Cannot cancel a completed review request');
    }

    await this.updateReviewRequestStatus(reviewId, ReviewRequestStatus.CANCELLED);

    return {
      id: reviewId,
      message: 'Review request cancelled successfully'
    };
  }
}