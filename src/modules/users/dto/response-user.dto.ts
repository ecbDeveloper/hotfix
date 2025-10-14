import { ApiProperty } from '@nestjs/swagger'
import { DevStatuses, User, UserRole } from '../entities/user.entity'
import { Language, Languages } from 'src/common/entities/language.entity'

export type UserWithLanguages = User & { languages: Language[] };

export class UserResponseDto {
  @ApiProperty({ example: 'a56c69ae-6f37-4c2d-b9db-8f876e7342a1' })
  id: string

  @ApiProperty({ example: 'Eduardo' })
  firstName: string

  @ApiProperty({ example: 'Castilho' })
  lastName: string

  @ApiProperty({ example: 'eduardo@email.com' })
  email: string

  @ApiProperty({
    type: Number,
    example: UserRole.DEVELOPER
  })
  roleId: UserRole

  @ApiProperty({
    type: Number,
    example: DevStatuses.RESTING
  })
  devStatusId: DevStatuses

  @ApiProperty({
    type: [Number],
    example: [Languages.TYPESCRIPT, Languages.GO],
  })
  languages: number[]

  @ApiProperty({
    example: '2025-10-14T12:34:56.000Z',
  })
  createdAt?: Date;

  @ApiProperty({
    example: '2025-10-14T12:34:56.000Z',
  })
  updatedAt?: Date;
}

