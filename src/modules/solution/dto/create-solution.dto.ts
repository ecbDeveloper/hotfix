import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateSolutionDto {
  @ApiProperty({
    example: '2b1c4e5f-3a67-4d9a-8e12-1b3456789abc',
  })
  @IsUUID()
  @IsNotEmpty()
  reviewId: string;

  @ApiProperty({
    example: '9d7e6c5b-4a32-1f09-8e76-5c4b3a2d1f0e',
  })
  @IsUUID()
  @IsNotEmpty()
  devId: string;

  @ApiProperty({
    example: 'Aqui está a implementação da função conforme solicitado...',
  })
  @IsString()
  @IsNotEmpty()
  solution: string;
}
