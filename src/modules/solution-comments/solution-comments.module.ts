import { Module } from '@nestjs/common';
import { SolutionCommentsController } from './solution-comments.controller';
import { SolutionCommentsService } from './solution-comments.service';
import { SolutionCommentsRepository } from './solution-comments.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { SolutionComment } from './entities/solution-comment.entity';
import { ReviewRequestModule } from '../review-request/review-request.module';
import { SolutionModule } from '../solution/solution.module';
import { AcceptReviewModule } from '../accept-review/accept-review.module';

@Module({
  imports: [
    SequelizeModule.forFeature([SolutionComment]),
    ReviewRequestModule,
    SolutionModule,
    AcceptReviewModule,
  ],
  controllers: [SolutionCommentsController],
  providers: [SolutionCommentsService, SolutionCommentsRepository],
  exports: [SolutionCommentsService]
})
export class SolutionCommentsModule { }
