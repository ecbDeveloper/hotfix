import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import all models
import { User } from 'src/modules/users/entities/user.entity';
import { Role } from 'src/common/entities/role.entity';
import { Language } from 'src/common/entities/language.entity';
import { UserLanguage } from 'src/common/entities/user-language.entity';
import { ReviewRequest } from 'src/modules/review-request/entities/review-request.entity';
import { ReviewStatus } from 'src/common/entities/review-status.entity';
import { PaymentMethods } from 'src/common/entities/payment-method.entity';
import { DevStatus } from 'src/common/entities/dev-status.entity';
import { AcceptReview } from 'src/modules/accept-review/entities/accept-review.entity';
import { AcceptReviewStatus } from 'src/common/entities/accept-review-status.entity';
import { Solution } from 'src/modules/solution/entities/solution.entity';
import { Statement } from 'src/common/entities/statement.entity';
import { StatementAuditLog } from 'src/common/entities/statement-audit-log.entity';
import { Notification } from 'src/common/entities/notification.entity';

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
