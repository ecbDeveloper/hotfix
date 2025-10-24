import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StatementsService } from './statements.service';
import { StatementsController } from './statements.controller';
import { Statement } from '../../common/entities/statement.entity';
import { AuditModule } from '../audit/audit.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { StatementNotificationsService } from './statement-notifications.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Statement]),
    AuditModule,
    NotificationsModule,
  ],
  controllers: [StatementsController],
  providers: [StatementsService, StatementNotificationsService],
  exports: [StatementsService],
})
export class StatementsModule {}