import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuditService } from './audit.service';
import { StatementAuditLog } from '../../common/entities/statement-audit-log.entity';

@Module({
  imports: [SequelizeModule.forFeature([StatementAuditLog])],
  providers: [AuditService],
  exports: [AuditService]
})
export class AuditModule {}