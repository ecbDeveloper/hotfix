import { ApiProperty } from "@nestjs/swagger";

export class PaginatedDto<TData> {
  @ApiProperty({
    example: 100,
  })
  total: number;

  @ApiProperty({
    example: 10
  })
  limit: number;

  @ApiProperty({
    example: 0
  })
  offset: number;

  results: TData[];
}

