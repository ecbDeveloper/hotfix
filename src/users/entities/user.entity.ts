import { Optional } from 'sequelize';
import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

export enum UserRole {
  CLIENT = 1,
  DEV,
}

interface UserAttributes {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  active: boolean;
}

export type UserCreationAttributes = Optional<UserAttributes, 'id' | 'active'>;

@Table({
  tableName: 'users',
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
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

  @Column
  role!: UserRole;

  @Column({
    defaultValue: true,
  })
  active!: boolean;
}
