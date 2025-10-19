import { Optional } from 'sequelize';
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  Default,
} from 'sequelize-typescript';
import { AcceptReview } from 'src/modules/accept-review/entities/accept-review.entity';

interface SolutionAttributes {
  id: string;
  acceptReviewId: string;
  solution: string;
  acceptedSolution: boolean;
}

type SolutionCreationAttributes = Optional<SolutionAttributes, 'id' | 'acceptedSolution'>

@Table({
  tableName: 'solution-reviews',
  timestamps: true,
})
export class Solution extends Model<SolutionAttributes, SolutionCreationAttributes> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @ForeignKey(() => AcceptReview)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  acceptReviewId: string;

  @BelongsTo(() => AcceptReview)
  acceptReview: AcceptReview;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  solution: string;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  acceptedSolution: boolean;
}
