import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class AcceptSolutionDto {
  @ApiProperty({
    example: '9d7e6c5b-4a32-1f09-8e76-5c4b3a2d1f0e',
    description: 'The ID of the user accepting the solution',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    example: '2b1c4e5f-3a67-4d9a-8e12-1b3456789abc',
    description: 'The ID of the solution being accepted',
  })
  @IsUUID()
  @IsNotEmpty()
  solutionId: string;
}