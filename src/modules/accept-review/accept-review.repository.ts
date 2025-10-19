import { Injectable } from "@nestjs/common";
import { CreateAcceptReview } from "./dto/create-accept-review.dto";
import { AcceptReview, AcceptReviewStatuses } from "./entities/accept-review.entity";
import { UpdateAcceptReviewDto } from "./dto/update-accept-review.dto";
import { Op } from "sequelize";

@Injectable()
export class AcceptReviewRepository {
  async create(createAcceptReview: CreateAcceptReview) {
    return await AcceptReview.create(createAcceptReview)
  }

  async updateAcceptReviewProgress(updateAcceptReview: UpdateAcceptReviewDto) {
    const { devId, reviewId, acceptReviewStatus } = updateAcceptReview
    return await AcceptReview.update({ status: acceptReviewStatus }, {
      where: { reviewId, devId }
    })
  }

  async findOneByDevAndReviewId(reviewId: string, devId: string) {
    return await AcceptReview.findOne({
      where: { reviewId, devId }
    })
  }

  async findAllByDev(devId: string) {
    return await AcceptReview.findAll({
      where: {
        devId, status: {
          [Op.in]: [2, 4]
        }
      }
    })
  }

  async findInProgress(reviewId: string) {
    return await AcceptReview.findOne({
      where: {
        reviewId, status: {
          status: {
            [Op.in]: [AcceptReviewStatuses.ACCEPTED, AcceptReviewStatuses.COMPLETED],
          },
        }
      }
    })
  }

  async rejectAllPending(reviewId: string) {
    return await AcceptReview.update({
      status: AcceptReviewStatuses.REJECTED
    }, {
      where: {
        reviewId,
        status: AcceptReviewStatuses.PENDING,
      }
    })
  }

  async findAllPeding(reviewId: string) {
    return await AcceptReview.findAll({
      where: { reviewId, status: AcceptReviewStatuses.PENDING }
    })
  }

  async findOneById(acceptReviewId: string) {
    return await AcceptReview.findOne({
      where: { id: acceptReviewId }
    })
  }

  async findOneByDevAndAcceptReviewId(acceptReviewId: string, devId: string) {
    return await AcceptReview.findOne({
      where: { id: acceptReviewId, devId }
    })
  }

}
