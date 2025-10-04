import { Injectable } from '@nestjs/common';
import { CreateReviewRequestDto } from './dto/create-review-request.dto';
import { ReviewRequestRepository } from './review-request.repository';

@Injectable()
export class ReviewRequestService {
  constructor(private readonly reviewResquestRepository: ReviewRequestRepository) { }

  create(createReviewRequestDto: CreateReviewRequestDto) {
    return 'This action adds a new reviewRequest';
  }

  findAll() {
    return `This action returns all reviewRequest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reviewRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} reviewRequest`;
  }
}
