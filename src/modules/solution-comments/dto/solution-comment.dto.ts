import { ApiProperty } from '@nestjs/swagger';

export class SolutionCommentDto {
  @ApiProperty({
    example: 'e0bfb730-2430-4d6f-94b9-982a4a790ec0',
  })
  id: string;

  @ApiProperty({
    example: '1e9a2c1d-6f3a-4baf-bb52-98df2b22f111',
  })
  solutionId: string;

  @ApiProperty({
    example: '1e9a2c1d-6f3a-4baf-bb52-98df2b22f111',
  })
  devId: string;

  @ApiProperty({
    example: 'Gostei da clareza da explicação!',
  })
  comment: string;

  @ApiProperty({
    example: '2025-10-14T12:34:56.000Z',
  })
  createdAt?: Date;

  @ApiProperty({
    example: '2025-10-14T12:34:56.000Z',
  })
  updatedAt?: Date;
}
