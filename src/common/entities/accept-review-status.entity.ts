import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { AcceptReview } from 'src/modules/accept-review/entities/accept-review.entity';

@Table({ tableName: 'accept_review_statuses', timestamps: false })
export class AcceptReviewStatus extends Model {
  @Column
  description!: string;

  @HasMany(() => AcceptReview)
  acceptReview!: AcceptReview[];
}
