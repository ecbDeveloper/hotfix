import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    @InjectRepository(StatementAuditLog)
    private auditLogRepository: Repository<StatementAuditLog>,
  ) {}

  async logStatementChange(createAuditLogDto: CreateAuditLogDto): Promise<void> {
    const auditLog = this.auditLogRepository.create(createAuditLogDto);
    await this.auditLogRepository.save(auditLog);
  }

  async getStatementHistory(statementId: string): Promise<StatementAuditLog[]> {
    return await this.auditLogRepository.find({
      where: { statementId },
      relations: ['user'],
      order: { createdAt: 'DESC' }
    });
  }

  async getUserAuditHistory(userId: string): Promise<StatementAuditLog[]> {
    return await this.auditLogRepository.find({
      where: { userId },
      relations: ['user'],
      order: { createdAt: 'DESC' }
    });
  }
}