import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserCommentsService } from './user-comments.service';
import { UserCommentsController } from './user-comments.controller';
import { UserComment } from './entities/user-comment.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([UserComment]),
  ],
  controllers: [UserCommentsController],
  providers: [UserCommentsService],
  exports: [UserCommentsService],
})
export class UserCommentsModule {}