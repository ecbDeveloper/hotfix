import { ApiProperty } from "@nestjs/swagger";

export class LoginResponse {
  @ApiProperty({
    example: "b5d4b6f9-514e-461c-bce2-173c41da568f"
  })
  message: string;

  @ApiProperty({
    example: "b5d4b6f9-514e-461c-bce2-173c41da568f"
  })
  userId: string;

  @ApiProperty({
    example: "b5d4b6f9-514e-461c-bce2-173c41da568f"
  })
  token: string;
}
