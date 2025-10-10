import { ApiProperty } from "@nestjs/swagger";

export class AcceptReviewResponseDto {
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

export class AcceptReviewDto {
  @ApiProperty({
    example: '7f2b4b5e-1a2c-4f67-8a21-cc23d234abcd',
  })
  devId: string;

  @ApiProperty({
    example: '0e4c0f10-7b32-4a2b-8b18-03e9a9d0b23d',
  })
  reviewId: string;

  @ApiProperty({
    example: true,
    default: true,
  })
  inProgress: boolean;
}

