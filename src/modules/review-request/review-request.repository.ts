import { Injectable } from "@nestjs/common";
import { CreateReviewRequestDto } from "./dto/create-review-request.dto";
import { ReviewRequest } from "./entities/review-request.entity";
import { Op } from 'sequelize'
import { Solution } from "../solution/entities/solution.entity";

@Injectable()
export class ReviewRequestRepository {
  async create(createReviewRequestDto: CreateReviewRequestDto) {
    const reviewRequest = await ReviewRequest.create(createReviewRequestDto);
    return reviewRequest.id;
  }

  async findAll(limit?: number, offset?: number) {
    const { count, rows } = await ReviewRequest.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      include: [Solution],
    });

    return {
      total: count,
      results: rows
    };
  }

  async findAllByUserId(userId: string, limit?: number, offset?: number) {
    const { count, rows } = await ReviewRequest.findAndCountAll({
      where: { userId },
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      include: [Solution],
    });

    return {
      total: count,
      results: rows
    };
  }

  async findOneById(reviewId: string) {
    return await ReviewRequest.findOne({
      where: { id: reviewId },
      include: [Solution]
    });
  }

  async findReviewRequestInProgressByUser(userId: string) {
    return await ReviewRequest.findOne({
      where: {
        userId,
        status: {
          [Op.in]: [1, 2]
        }
      }
    });
  }

  async updateReviewRequestStatus(reviewId: string, status: number) {
    return await ReviewRequest.update(
      { status },
      { where: { id: reviewId } }
    );
  }
}
