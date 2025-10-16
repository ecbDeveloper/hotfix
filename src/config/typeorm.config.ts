import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Statement } from '../common/entities/statement.entity';
import { SystemConfig } from '../common/entities/system-config.entity';
import { Notification } from '../common/entities/notification.entity';
import { StatementAuditLog } from '../common/entities/statement-audit-log.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Statement, SystemConfig, Notification, StatementAuditLog],
  synchronize: false,
};