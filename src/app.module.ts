import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ReviewRequestModule } from './modules/review-request/review-request.module';
import { AcceptReviewModule } from './modules/accept-review/accept-review.module';
import { SolutionModule } from './modules/solution/solution.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { SolutionCommentsModule } from './modules/solution-comments/solution-comments.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    SequelizeModule.forRoot({
      dialect: 'postgres',
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      autoLoadModels: true,
      define: {
        underscored: true,
      },
    }),
    UsersModule,
    AuthModule,
    ReviewRequestModule,
    AcceptReviewModule,
    SolutionModule,
    SolutionCommentsModule
  ],
})
export class AppModule { }
