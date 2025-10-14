import { BelongsToMany, Column, Model, Table } from "sequelize-typescript";
import { User } from "src/modules/users/entities/user.entity";
import { UserLanguage } from "./user-language.entity";

export enum Languages {
  JAVASCRIPT = 1,
  TYPESCRIPT,
  PYTHON,
  JAVA,
  CSHARP,
  C,
  CPP,
  GO,
  RUST,
  PHP,
  RUBY,
  KOTLIN,
  SWIFT,
  DART,
  SCALA,
  R,
}


@Table({ tableName: 'languages', timestamps: false })
export class Language extends Model {
  @Column({
    primaryKey: true
  })
  declare id: number;

  @Column
  description: string;

  @BelongsToMany(() => User, () => UserLanguage)
  users: User[]
}
