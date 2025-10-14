import { Optional } from 'sequelize';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { DevStatus } from 'src/common/entities/dev-status.entity';
import { Language } from 'src/common/entities/language.entity';
import { Role } from 'src/common/entities/role.entity';
import { UserLanguage } from 'src/common/entities/user-language.entity';
import { AcceptReview } from 'src/modules/accept-review/entities/accept-review.entity';

export enum UserRole {
  CLIENT = 1,
  DEVELOPER = 2,
}

export enum DevStatuses {
  RESTING = 1,
  WORKING = 2,
  ON_REVIEW = 3
}

interface UserAttributes {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId: UserRole;
  active: boolean;
  devStatusId: number;
}

export type UserCreationAttributes = Optional<UserAttributes, 'id' | 'active' | 'devStatusId'>;

@Table({
  tableName: 'users',
  timestamps: true
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column
  firstName!: string;

  @Column
  lastName!: string;

  @Unique
  @Column
  email!: string;

  @Column
  password!: string;

  @Default(true)
  @Column
  active!: boolean;

  @ForeignKey(() => Role)
  @Column
  roleId: UserRole;

  @BelongsTo(() => Role)
  role!: Role;

  @ForeignKey(() => DevStatus)
  @Column
  devStatusId: DevStatuses;

  @BelongsTo(() => DevStatus)
  devStatus!: DevStatuses;

  @BelongsToMany(() => Language, () => UserLanguage)
  languages!: Language[]

  @HasMany(() => AcceptReview)
  acceptedReviews!: AcceptReview[];
}
