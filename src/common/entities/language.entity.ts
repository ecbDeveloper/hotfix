import { BelongsToMany, Column, Model, Table } from "sequelize-typescript";
import { User } from "src/modules/users/entities/user.entity";
import { UserLanguage } from "./user-language.entity";

@Table({ tableName: 'languages', timestamps: false })
export class Language extends Model {
  @Column
  description: string;

  @BelongsToMany(() => User, () => UserLanguage)
  users: User[]
}
