import { Optional } from 'sequelize';
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Solution } from 'src/modules/solution/entities/solution.entity';
import { User } from 'src/modules/users/entities/user.entity';

export interface SolutionCommentAttributes {
  id: string,
  solutionId: string,
  userId: string,
  comment: string,
}

type SolutionCommentAttributesCreation = Optional<SolutionCommentAttributes, 'id'>

@Table({
  tableName: 'solution_comments',
  timestamps: true,
})
export class SolutionComment extends Model<SolutionCommentAttributes, SolutionCommentAttributesCreation> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @ForeignKey(() => Solution)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'solution_id',
  })
  solutionId: string;

  @BelongsTo(() => Solution)
  solution: Solution;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'solution_id',
  })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  comment: string;
}
