import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../../modules/users/entities/user.entity';

export enum NotificationType {
  BALANCE_CHANGED = 'balance_changed',
  TRANSACTION_COMPLETED = 'transaction_completed',
  SYSTEM_CONFIG_CHANGED = 'system_config_changed',
  REVIEW_REQUEST = 'review_request',
  SOLUTION_SUBMITTED = 'solution_submitted',
  STATEMENT_CREATED = 'statement_created',
  STATEMENT_UPDATED = 'statement_updated',
  STATEMENT_DELETED = 'statement_deleted'
}

@Table({
  tableName: 'notifications',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export class Notification extends Model {
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
    type: DataType.ENUM(...Object.values(NotificationType))
  })
  type: NotificationType;

  @Column({
    type: DataType.STRING
  })
  title: string;

  @Column({
    type: DataType.TEXT
  })
  message: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  read: boolean;

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