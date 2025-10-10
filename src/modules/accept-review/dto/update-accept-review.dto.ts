import { ReviewRequestStatus } from "src/modules/review-request/entities/review-request.entity";

export interface UpdateAcceptReviewDto {
  userId: string;
  inProgress: boolean;
  reviewStatus: ReviewRequestStatus;
  devId: string;
  reviewId: string;
}
