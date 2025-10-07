import { Injectable } from "@nestjs/common";
import { CreateReviewRequestDto } from "./dto/create-review-request.dto";
import { ReviewRequest } from "./entities/review-request.entity";
import { Op } from 'sequelize'

@Injectable()
export class ReviewRequestRepository {
  async create(createReviewRequestDto: CreateReviewRequestDto) {
    const reviewRequest = await ReviewRequest.create(createReviewRequestDto)

    return reviewRequest.id
  }

  async findOneByEmail(reviewId: string) {
    return await ReviewRequest.findOne({
      where: {
        id: reviewId
      }
    })
  }

  async findReviewRequestInProgressByUser(userId: string) {
    return await ReviewRequest.findOne({
      where: {
        userId,
        status: {
          [Op.in]: [1, 2]
        }
      }
    })
  }

  async updateReviewRequestStatus(reviewId: string, status: number) {
    return await ReviewRequest.update(
      { status },
      { where: { id: reviewId } },
    );
  }
}
