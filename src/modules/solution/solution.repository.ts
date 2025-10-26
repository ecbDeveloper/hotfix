import { Injectable } from "@nestjs/common";
import { CreateSolutionDto } from "./dto/create-solution.dto";
import { Solution } from "./entities/solution.entity";

@Injectable()
export class SolutionRepository {
  async create(createSolutionDto: CreateSolutionDto) {
    const solutionReview = await Solution.create(createSolutionDto)

    return solutionReview
  }

  async findOneByAcceptReview(acceptReviewId: string) {
    return await Solution.findOne({
      where: { acceptReviewId }
    })
  }

  async findOneById(solutionId: string) {
    return await Solution.findOne({
      where: { id: solutionId },
    })
  }


  async updateSolution(solutionId: string, solution: string) {
    return await Solution.update({
      solution
    }, {
      where: { id: solutionId }
    })
  }

  async acceptSolution(solutionId: string) {
    return await Solution.update({
      acceptedSolution: true
    }, {
      where: { id: solutionId },
    })
  }

  async findOneByReview(reviewId: string) {
    const acceptReview = await Solution.findOne({
      include: [{
        association: 'acceptReview',
        where: { reviewId }
      }]
    });
    return acceptReview;
  }
}
