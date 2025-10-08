import { BelongsToMany, Column, Model, Table } from "sequelize-typescript";
import { User } from "src/modules/users/entities/user.entity";
import { UserLanguage } from "./user-language.entity";

export enum Languages {
  JAVASCRIPT = 'JavaScript',
  TYPESCRIPT = 'TypeScript',
  PYTHON = 'Python',
  JAVA = 'Java',
  CSHARP = 'C#',
  C = 'C',
  CPP = 'C++',
  GO = 'Go',
  RUST = 'Rust',
  PHP = 'PHP',
  RUBY = 'Ruby',
  KOTLIN = 'Kotlin',
  SWIFT = 'Swift',
  DART = 'Dart',
  SCALA = 'Scala',
  R = 'R',
}


@Table({ tableName: 'languages', timestamps: false })
export class Language extends Model {
  @Column
  description: string;

  @BelongsToMany(() => User, () => UserLanguage)
  users: User[]
}
