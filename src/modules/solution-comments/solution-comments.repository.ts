import { Injectable } from "@nestjs/common";
import { CreateSolutionCommentDto } from "./dto/create-solution-comment.dto";
import { UpdateSolutionCommentDto } from "./dto/update-solution-comment.dto";
import { SolutionComment } from "./entities/solution-comment.entity";

@Injectable()
export class SolutionCommentsRepository {
  async create(createSolutionCommentDto: CreateSolutionCommentDto) {
    return await SolutionComment.create(createSolutionCommentDto)
  }

  async findAllBySolution(solutionId: string) {
    return await SolutionComment.findAll({
      where: { solutionId }
    })
  }

  async findOneById(id: string) {
    return await SolutionComment.findOne({
      where: { id }
    })
  }

  async update(id: string, updateSolutionCommentDto: UpdateSolutionCommentDto) {
    const { comment } = updateSolutionCommentDto

    return await SolutionComment.update({ comment }, {
      where: { id }
    })
  }

  async remove(id: string) {
    return await SolutionComment.destroy({
      where: { id }
    })
  }
}
