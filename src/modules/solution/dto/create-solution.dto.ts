import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateSolutionDto {
  @ApiProperty({
    example: '2b1c4e5f-3a67-4d9a-8e12-1b3456789abc',
  })
  @IsUUID()
  @IsNotEmpty()
  acceptReviewId: string;

  @ApiProperty({
    example: 'Aqui está a implementação da função conforme solicitado...',
  })
  @IsString()
  @IsNotEmpty()
  solution: string;

  devId: string
}
