import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { User } from 'src/modules/users/entities/user.entity';

@Table({ tableName: 'dev_statuses', timestamps: false })
export class DevStatus extends Model {
  @Column
  description!: string;

  @HasMany(() => User)
  user!: User[];
}


