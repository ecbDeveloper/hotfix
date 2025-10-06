import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { ReviewRequest } from "src/modules/review-request/entities/review-request.entity";
@Table({ tableName: 'payment_methods', timestamps: false })

export class PaymentMethods extends Model {
  @Column
  description: string;

  @HasMany(() => ReviewRequest)
  reviewRequest: ReviewRequest[]
}

