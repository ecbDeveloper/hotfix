import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Solution } from 'src/modules/solution/entities/solution.entity';

@Table({
  tableName: 'solution_comments',
  timestamps: true,
})
export class SolutionComment extends Model<SolutionComment> {
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

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  comment: string;
}
