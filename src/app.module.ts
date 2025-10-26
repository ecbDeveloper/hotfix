import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ReviewRequestModule } from './modules/review-request/review-request.module';
import { AcceptReviewModule } from './modules/accept-review/accept-review.module';
import { SolutionModule } from './modules/solution/solution.module';
import { SystemConfigsModule } from './modules/system-configs/system-configs.module';
import { StatementsModule } from './modules/statements/statements.module';
import { DatabaseModule } from './config/database.module';
import { WebhooksModule } from './modules/webhooks/webhooks.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AuditModule } from './modules/audit/audit.module';
import { ChatModule } from './modules/chat/chat.module';
import { UserCommentsModule } from './modules/user-comments/user-comments.module';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot(databaseConfig),
    DatabaseModule,
    UsersModule,
    AuthModule,
    ReviewRequestModule,
    AcceptReviewModule,
    SolutionModule,
    UserCommentsModule,
    SystemConfigsModule,
    StatementsModule,
    WebhooksModule,
    NotificationsModule,
    AuditModule,
    ChatModule,
  ],
})
export class AppModule { }
