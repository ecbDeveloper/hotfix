
import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { User } from 'src/modules/users/entities/user.entity';

@Table({ tableName: 'roles', timestamps: false })
export class Role extends Model {

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name!: string;

  @HasMany(() => User)
  users!: User[];
}
