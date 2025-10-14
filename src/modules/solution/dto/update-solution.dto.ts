import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSolutiondDto {
  @ApiProperty({
    example: 'Aqui está a atualização da resolução conforme solicitado...',
  })
  @IsString()
  @IsNotEmpty()
  solution: string;
}
