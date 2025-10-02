import { Optional } from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Role } from 'src/common/entities/role.entity';

export enum UserRole {
  CLIENT = 1,
  DEVELOPER = 2,
}

interface UserAttributes {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId: UserRole;
  active: boolean;
}

export type UserCreationAttributes = Optional<UserAttributes, 'id' | 'active'>;

@Table({
  tableName: 'users',
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


  @ForeignKey(() => Role)
  @Column
  roleId!: number;

  @BelongsTo(() => Role)
  role!: Role;

  @Default(true)
  @Column
  active!: boolean;
}
