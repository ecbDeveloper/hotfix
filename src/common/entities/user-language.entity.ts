import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/modules/users/entities/user.entity";
import { Language } from "./language.entity";


@Table({ tableName: 'users_languages', timestamps: false })
export class UserLanguage extends Model {
  @ForeignKey(() => User)
  @Column
  userId: string;

  @ForeignKey(() => Language)
  @Column
  language: number;
}
