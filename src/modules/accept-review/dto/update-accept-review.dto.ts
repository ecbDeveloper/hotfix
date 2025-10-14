import { ReviewRequestStatus } from "src/modules/review-request/entities/review-request.entity";
import { AcceptReviewStatuses } from "../entities/accept-review.entity";

export interface UpdateAcceptReviewDto {
  userId: string;
  acceptReviewStatus: AcceptReviewStatuses;
  reviewStatus: ReviewRequestStatus;
  devId: string;
  reviewId: string;
}
