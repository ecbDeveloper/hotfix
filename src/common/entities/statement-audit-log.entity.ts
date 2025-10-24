import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Statement } from './statement.entity';
import { User } from '../../modules/users/entities/user.entity';

@Table({
  tableName: 'statement_audit_logs',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
})
export class StatementAuditLog extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => Statement)
  @Column({
    type: DataType.UUID,
    field: 'statement_id'
  })
  statementId: string;

  @BelongsTo(() => Statement)
  statement: Statement;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    field: 'user_id',
    allowNull: true
  })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.ENUM('create', 'update', 'delete')
  })
  action: 'create' | 'update' | 'delete';

  @Column({
    type: DataType.JSONB
  })
  oldData: Record<string, any>;

  @Column({
    type: DataType.JSONB
  })
  newData: Record<string, any>;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  reason: string;

  @Column({
    field: 'created_at',
    type: DataType.DATE
  })
  createdAt: Date;
}