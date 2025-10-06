import { ApiProperty } from "@nestjs/swagger";

export class LoginResponse {
  @ApiProperty()
  message: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  token: string;
}
