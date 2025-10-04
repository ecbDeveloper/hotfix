import { Optional } from 'sequelize';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Language } from 'src/common/entities/language.entity';
import { Role } from 'src/common/entities/role.entity';
import { UserLanguage } from 'src/common/entities/user-language.entity';

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
  roleId: number;

  @BelongsTo(() => Role)
  role!: Role;

  @BelongsToMany(() => Language, () => UserLanguage)
  languages: Language[]
}
