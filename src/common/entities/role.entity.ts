import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { User } from 'src/modules/users/entities/user.entity';

@Table({ tableName: 'roles', timestamps: false })
export class Role extends Model {
  @Column
  description!: string;

  @HasMany(() => User)
  users!: User[];
}
