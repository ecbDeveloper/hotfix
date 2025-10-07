import { Injectable } from "@nestjs/common";
import { CreateAcceptReviewDto } from "./dto/create-accept-review.dto";
import { AcceptReview } from "./entities/accept-review.entity";
import { UpdateAcceptReviewDto } from "./dto/update-accept-review.dto";

@Injectable()
export class AcceptReviewRepository {
  async create(createAcceptReviewDto: CreateAcceptReviewDto) {
    return await AcceptReview.create(createAcceptReviewDto)
  }

  async updateAcceptReviewProgress(updateAcceptReviewDto: UpdateAcceptReviewDto) {
    const { devId, reviewId, inProgress } = updateAcceptReviewDto
    return await AcceptReview.update({ inProgress }, {
      where: { reviewId, devId }
    })
  }
}
