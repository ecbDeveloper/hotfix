import { Injectable } from "@nestjs/common";
import { CreateSolutionDto } from "./dto/create-solution.dto";
import { Solution } from "./entities/solution.entity";

@Injectable()
export class SolutionRepository {
  async create(createSolutionDto: CreateSolutionDto) {
    const solutionReview = await Solution.create(createSolutionDto)

    return solutionReview
  }

  async findOneByReview(reviewId: string) {
    return await Solution.findOne({
      where: { reviewId }
    })
  }

  async findOne(solutionId: string) {
    return await Solution.findOne({
      where: { id: solutionId }
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
      where: { id: solutionId }
    })
  }
}
