import { Optional } from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Language } from 'src/common/entities/language.entity';
import { ReviewStatus } from 'src/common/entities/review-status.entity';

export enum ReviewRequestStatus {
  OPEN = 1,
  IN_PROGRESS = 2,
  DONE = 3,
  CANCELLED = 4,
}

interface ReviewRequestAttributes {
  id: string;
  price: number;
  title: string;
  description: string;
  codeSnippet: string;
  status: number;
  language: number;
}

export type ReviewRequestCreationAttributes = Optional<ReviewRequestAttributes, 'id'>;

@Table({ tableName: 'review_request', timestamps: true })
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
  status!: number;

  @ForeignKey(() => Language)
  @Column
  language!: number;

  @BelongsTo(() => ReviewStatus)
  reviewStatus!: ReviewStatus;

  @BelongsTo(() => Language)
  languageEntity!: Language;
}
