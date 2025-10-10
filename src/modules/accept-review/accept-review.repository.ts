import { Injectable } from "@nestjs/common";
import { CreateAcceptReview } from "./dto/create-accept-review.dto";
import { AcceptReview } from "./entities/accept-review.entity";
import { UpdateAcceptReviewDto } from "./dto/update-accept-review.dto";

@Injectable()
export class AcceptReviewRepository {
  async create(createAcceptReview: CreateAcceptReview) {
    return await AcceptReview.create(createAcceptReview)
  }

  async updateAcceptReviewProgress(updateAcceptReview: UpdateAcceptReviewDto) {
    const { devId, reviewId, inProgress } = updateAcceptReview
    return await AcceptReview.update({ inProgress }, {
      where: { reviewId, devId }
    })
  }

  async findAcceptReview(reviewId: string, devId: string) {
    return await AcceptReview.findOne({
      where: { reviewId, devId }
    })
  }

  async findAllByDev(devId: string) {
    return await AcceptReview.findAll({
      where: { devId }
    })
  }
}
