import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
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

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    type: 'enum',
    enum: NotificationType,
  })
  type: NotificationType;

  @Column()
  title: string;

  @Column('text')
  message: string;

  @Column({ default: false })
  read: boolean;

  @Column('jsonb', { nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}