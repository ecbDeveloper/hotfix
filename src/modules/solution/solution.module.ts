import { Module } from '@nestjs/common';
import { SolutionController } from './solution.controller';
import { SolutionService } from './solution.service';
import { SolutionRepository } from './solution.repository';
import { ReviewRequestModule } from '../review-request/review-request.module';
import { UsersModule } from '../users/users.module';
import { AcceptReviewModule } from '../accept-review/accept-review.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Solution } from './entities/solution.entity';

@Module({
  exports: [SolutionService],
  controllers: [SolutionController],
  providers: [SolutionService, SolutionRepository],
  imports: [
    SequelizeModule.forFeature([Solution]),
    ReviewRequestModule,
    UsersModule,
    AcceptReviewModule
  ]
})
export class SolutionModule { }
