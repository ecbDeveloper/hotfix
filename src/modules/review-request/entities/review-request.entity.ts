import { Optional } from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Language, Languages } from 'src/common/entities/language.entity';
import { PaymentMethods } from 'src/common/entities/payment-method.entity';
import { ReviewStatus } from 'src/common/entities/review-status.entity';
import { AcceptReview } from 'src/modules/accept-review/entities/accept-review.entity';
import { User } from 'src/modules/users/entities/user.entity';

export enum ReviewRequestStatus {
  OPEN = 1,
  IN_PROGRESS = 2,
  DONE = 3,
  CANCELLED = 4,
}

export enum Payments {
  PIX = 1,
  CREDIT_CARD = 2,
}

interface ReviewRequestAttributes {
  id: string;
  userId: string;
  price: number;
  title: string;
  description: string;
  codeSnippet: string;
  status: ReviewRequestStatus;
  language: Languages;
  paymentMethod: Payments;
}

export type ReviewRequestCreationAttributes = Optional<ReviewRequestAttributes, 'id' | 'status'>;

@Table({ tableName: 'review_requests', timestamps: true })
export class ReviewRequest extends Model<ReviewRequestAttributes, ReviewRequestCreationAttributes> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({ type: DataType.FLOAT, allowNull: false })
  price!: number;

  @Column
  title!: string;

  @Column
  description!: string;

  @Column
  codeSnippet!: string;

  @ForeignKey(() => ReviewStatus)
  @Column
  status!: ReviewRequestStatus;

  @ForeignKey(() => Language)
  @Column
  language!: number;

  @ForeignKey(() => PaymentMethods)
  @Column
  paymentMethod!: Payments;

  @ForeignKey(() => User)
  @Column
  userId!: string;

  @BelongsTo(() => ReviewStatus)
  reviewStatus!: ReviewStatus;

  @BelongsTo(() => Language)
  languageEntity!: Language;

  @BelongsTo(() => PaymentMethods)
  paymentMethodEntity!: PaymentMethods;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => User)
  dev!: User;

  @HasMany(() => AcceptReview)
  acceptedBy: AcceptReview[];
}
