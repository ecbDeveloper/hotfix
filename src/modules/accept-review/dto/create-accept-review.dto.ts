import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateAcceptReviewDto {
  @ApiProperty({
    example: "f2028663-b2ef-42e7-be18-02be5df92b61"
  })
  @IsUUID('4')
  @IsNotEmpty()
  reviewId: string
}

export interface CreateAcceptReview {
  devId: string
  reviewId: string
}

