import { Injectable } from "@nestjs/common";
import { CreateAcceptReview } from "./dto/create-accept-review.dto";
import { AcceptReview } from "./entities/accept-review.entity";
import { UpdateAcceptReview } from "./dto/update-accept-review.dto";

@Injectable()
export class AcceptReviewRepository {
  async create(createAcceptReview: CreateAcceptReview) {
    return await AcceptReview.create(createAcceptReview)
  }

  async updateAcceptReviewProgress(updateAcceptReview: UpdateAcceptReview) {
    const { devId, reviewId, inProgress } = updateAcceptReview
    return await AcceptReview.update({ inProgress }, {
      where: { reviewId, devId }
    })
  }
}
