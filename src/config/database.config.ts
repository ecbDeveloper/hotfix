import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import all models
import { User } from '../modules/users/entities/user.entity';
import { Role } from '../common/entities/role.entity';
import { Language } from '../common/entities/language.entity';
import { UserLanguage } from '../common/entities/user-language.entity';
import { ReviewRequest } from '../modules/review-request/entities/review-request.entity';
import { ReviewStatus } from '../common/entities/review-status.entity';
import { PaymentMethods } from '../common/entities/payment-method.entity';
import { DevStatus } from '../common/entities/dev-status.entity';
import { AcceptReview } from '../modules/accept-review/entities/accept-review.entity';
import { AcceptReviewStatus } from '../common/entities/accept-review-status.entity';
import { Solution } from '../modules/solution/entities/solution.entity';
import { Statement } from '../common/entities/statement.entity';
import { StatementAuditLog } from '../common/entities/statement-audit-log.entity';
import { Notification } from '../common/entities/notification.entity';

// Define models array
const models = [
  User,
  Role,
  Language,
  UserLanguage,
  ReviewRequest,
  ReviewStatus,
  PaymentMethods,
  DevStatus,
  AcceptReview,
  AcceptReviewStatus,
  Solution,
  Notification,
  Statement,
  StatementAuditLog
];

// Common database configuration
const baseConfig: SequelizeOptions = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    underscored: true,
    timestamps: true,
  },
  logging: false,
  models, // Add models to base config
};

// Create sequelize instance
export const db = new Sequelize(baseConfig);

// Export configuration for NestJS module
export const databaseConfig: SequelizeModuleOptions = {
  ...baseConfig,
  autoLoadModels: true,
  synchronize: false,
};
