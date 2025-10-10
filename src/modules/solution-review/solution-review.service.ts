import { Injectable } from '@nestjs/common';
import { CreateSolutionReviewDto } from './dto/create-solution-review.dto';
import { UpdateSolutionReviewDto } from './dto/update-solution-review.dto';

@Injectable()
export class SolutionReviewService {
  create(createSolutionReviewDto: CreateSolutionReviewDto) {
    return 'This action adds a new solutionReview';
  }

  findAll() {
    return `This action returns all solutionReview`;
  }

  findOne(id: number) {
    return `This action returns a #${id} solutionReview`;
  }

  update(id: number, updateSolutionReviewDto: UpdateSolutionReviewDto) {
    return `This action updates a #${id} solutionReview`;
  }

  remove(id: number) {
    return `This action removes a #${id} solutionReview`;
  }
}
