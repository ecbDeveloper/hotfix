import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ReviewRequestModule } from './modules/review-request/review-request.module';
import { AcceptReviewModule } from './modules/accept-review/accept-review.module';
import { SolutionModule } from './modules/solution/solution.module';
import { CommentsModule } from './modules/comments/comments.module';
import { SystemConfigsModule } from './modules/system-configs/system-configs.module';
import { StatementsModule } from './modules/statements/statements.module';
import { DatabaseModule } from './config/database.module';
import { WebhooksModule } from './modules/webhooks/webhooks.module';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    DatabaseModule,
    UsersModule,
    AuthModule,
    ReviewRequestModule,
    AcceptReviewModule,
    SolutionModule,
    CommentsModule,
    SystemConfigsModule,
    StatementsModule,
    WebhooksModule,
  ],
})
export class AppModule { }
