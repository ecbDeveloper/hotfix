import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditService } from './audit.service';
import { StatementAuditLog } from '../../common/entities/statement-audit-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StatementAuditLog])],
  providers: [AuditService],
  exports: [AuditService]
})
export class AuditModule {}