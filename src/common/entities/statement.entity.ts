import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../../modules/users/entities/user.entity';

export enum StatementType {
  CREDIT = 'credit',
  DEBIT = 'debit',
}

export enum StatementStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

@Table({
  tableName: 'statements',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export class Statement extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    field: 'user_id'
  })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.DECIMAL(10, 2)
  })
  amount: number;

  @Column({
    type: DataType.ENUM(...Object.values(StatementType))
  })
  type: StatementType;

  @Column({
    type: DataType.ENUM(...Object.values(StatementStatus))
  })
  status: StatementStatus;

  @Column({
    type: DataType.STRING
  })
  description: string;

  @Column({
    type: DataType.STRING,
    field: 'reference_id',
    allowNull: true
  })
  referenceId: string;

  @Column({
    type: DataType.STRING,
    field: 'reference_type',
    allowNull: true
  })
  referenceType: string;

  @Column({
    type: DataType.JSONB,
    allowNull: true
  })
  metadata: Record<string, any>;

  @Column({
    field: 'created_at',
    type: DataType.DATE
  })
  createdAt: Date;

  @Column({
    field: 'updated_at',
    type: DataType.DATE
  })
  updatedAt: Date;
}