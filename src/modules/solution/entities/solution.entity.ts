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
import { ReviewRequest } from 'src/modules/review-request/entities/review-request.entity';
import { User } from 'src/modules/users/entities/user.entity';

interface SolutionAttributes {
  id: string;
  reviewId: string;
  devId: string;
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

  @ForeignKey(() => ReviewRequest)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  reviewId: string;

  @BelongsTo(() => ReviewRequest)
  reviewRequest: ReviewRequest;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  devId: string;

  @BelongsTo(() => User)
  dev: User;

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
