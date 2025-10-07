import { Optional } from 'sequelize';
import { BelongsTo, Column, DataType, Default, ForeignKey, Model, Table } from 'sequelize-typescript'
import { ReviewRequest } from 'src/modules/review-request/entities/review-request.entity';
import { User } from 'src/modules/users/entities/user.entity';

interface AcceptReviewAttributes {
  devId: string
  reviewId: string
  inProgress: boolean
}

export type AcceptReviewAttributesCreation = Optional<AcceptReviewAttributes, 'inProgress'>

@Table({ tableName: 'accepts_reviews' })
export class AcceptReview extends Model<AcceptReviewAttributes, AcceptReviewAttributesCreation> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  devId: string;

  @BelongsTo(() => User)
  dev: User;

  @ForeignKey(() => ReviewRequest)
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  reviewId: string;

  @BelongsTo(() => ReviewRequest)
  review: ReviewRequest;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  inProgress: boolean;
}
