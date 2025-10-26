import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { StatementAuditLog } from '../../common/entities/statement-audit-log.entity';

export type AuditAction = 'create' | 'update' | 'delete';

export interface CreateAuditLogDto {
  statementId: string;
  userId: string;
  action: AuditAction;
  oldData?: Record<string, any>;
  newData?: Record<string, any>;
  reason?: string;
}

@Injectable()
export class AuditService {
  constructor(
    @InjectModel(StatementAuditLog)
    private auditLog: typeof StatementAuditLog,
  ) {}

  async logStatementChange(createAuditLogDto: CreateAuditLogDto): Promise<void> {
    await this.auditLog.create(createAuditLogDto as any);
  }

  async getStatementHistory(statementId: string): Promise<StatementAuditLog[]> {
    return await this.auditLog.findAll({
      where: { statementId },
      include: ['user'],
      order: [['createdAt', 'DESC']]
    });
  }

  async getUserAuditHistory(userId: string): Promise<StatementAuditLog[]> {
    return await this.auditLog.findAll({
      where: { userId },
      include: ['user'],
      order: [['createdAt', 'DESC']]
    });
  }
}