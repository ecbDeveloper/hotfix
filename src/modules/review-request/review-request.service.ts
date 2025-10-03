import { Injectable } from '@nestjs/common';
import { CreateReviewRequestDto } from './dto/create-review-request.dto';
import { UpdateReviewRequestDto } from './dto/update-review-request.dto';

@Injectable()
export class ReviewRequestService {
  create(createReviewRequestDto: CreateReviewRequestDto) {
    return 'This action adds a new reviewRequest';
  }

  findAll() {
    return `This action returns all reviewRequest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reviewRequest`;
  }

  update(id: number, updateReviewRequestDto: UpdateReviewRequestDto) {
    return `This action updates a #${id} reviewRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} reviewRequest`;
  }
}
