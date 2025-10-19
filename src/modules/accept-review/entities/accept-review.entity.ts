import { Optional } from 'sequelize';
import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript'
import { AcceptReviewStatus } from 'src/common/entities/accept-review-status.entity';
import { ReviewRequest } from 'src/modules/review-request/entities/review-request.entity';
import { User } from 'src/modules/users/entities/user.entity';

export enum AcceptReviewStatuses {
  PENDING = 1,
  ACCEPTED = 2,
  REJECTED = 3,
  COMPLETED = 4
}

interface AcceptReviewAttributes {
  id: string,
  devId: string
  reviewId: string
  status: AcceptReviewStatuses
}

export type AcceptReviewAttributesCreation = Optional<AcceptReviewAttributes, 'status' | 'id'>

@Table({ tableName: 'accepts_reviews' })
export class AcceptReview extends Model<AcceptReviewAttributes, AcceptReviewAttributesCreation> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  devId: string;

  @BelongsTo(() => User)
  dev: User;

  @ForeignKey(() => ReviewRequest)
  @Column({
    type: DataType.UUID,
  })
  reviewId: string;

  @BelongsTo(() => ReviewRequest)
  review: ReviewRequest;

  @ForeignKey(() => AcceptReviewStatus)
  @Column
  statusId: AcceptReviewStatuses

  @BelongsTo(() => AcceptReviewStatus)
  status: AcceptReviewStatus
}
