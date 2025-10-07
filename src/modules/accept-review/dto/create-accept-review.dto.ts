import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateAcceptReviewDto {
  @IsUUID('4')
  @IsNotEmpty()
  devId: string

  @IsUUID('4')
  @IsNotEmpty()
  reviewId: string
}
