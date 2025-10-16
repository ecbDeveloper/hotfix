import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Statement } from './statement.entity';
import { User } from '../../modules/users/entities/user.entity';

@Entity('statement_audit_logs')
export class StatementAuditLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'statement_id' })
  statementId: string;

  @ManyToOne(() => Statement)
  @JoinColumn({ name: 'statement_id' })
  statement: Statement;

  @Column({ name: 'user_id', nullable: true })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  action: 'create' | 'update' | 'delete';

  @Column('jsonb')
  oldData: Record<string, any>;

  @Column('jsonb')
  newData: Record<string, any>;

  @Column('text', { nullable: true })
  reason: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}