import { ApiProperty } from "@nestjs/swagger";

export class AcceptReviewResponse {
  @ApiProperty({
    example: "d65d9f02-f545-4f83-b140-c16c060646b5"
  })
  devId: string;

  @ApiProperty({
    example: "f2028663-b2ef-42e7-be18-02be5df92b61"
  })
  reviewId: string;

  @ApiProperty()
  message: string;
}

