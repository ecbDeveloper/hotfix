import { IsNotEmpty, IsBoolean, IsEnum } from "class-validator";
import { ReviewRequestStatus } from "src/modules/review-request/entities/review-request.entity";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateAcceptReviewDto {
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  inProgress: boolean;

  @ApiProperty({
    example: ReviewRequestStatus.IN_PROGRESS
  })
  @IsEnum(ReviewRequestStatus)
  @IsNotEmpty()
  reviewStatus: ReviewRequestStatus
}

export interface UpdateAcceptReview {
  inProgress: boolean;
  reviewStatus: ReviewRequestStatus
  devId: string
  reviewId: string
}
