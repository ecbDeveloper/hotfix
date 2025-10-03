import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { ReviewRequest } from 'src/modules/review-request/entities/review-request.entity';

@Table({ tableName: 'roles', timestamps: false })
export class ReviewStatus extends Model {
  @Column
  description!: string;

  @HasMany(() => ReviewRequest)
  reviewRequests!: ReviewRequest[];
}

