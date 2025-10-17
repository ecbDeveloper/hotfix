import { Module } from '@nestjs/common';
import { SolutionCommentsController } from './solution-comments.controller';
import { SolutionCommentsService } from './solution-comments.service';
import { SolutionCommentsRepository } from './solution-comments.repository';
import { SolutionModule } from '../solution/solution.module';

@Module({
  controllers: [SolutionCommentsController],
  providers: [SolutionCommentsService, SolutionCommentsRepository],
  exports: [SolutionModule]
})
export class CommentsModule { }
