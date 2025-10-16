import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment)
    private commentModel: typeof Comment,
  ) {}

  async create(createCommentDto: CreateCommentDto, userId: string): Promise<Comment> {
    const comment = await this.commentModel.create({
      ...createCommentDto,
      userId,
    });

    return comment;
  }

  async findAll(query: PaginationQueryDto): Promise<[Comment[], number]> {
    const { page = 1, limit = 10 } = query;
    const offset = (page - 1) * limit;

    const [comments, total] = await this.commentModel.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      include: ['user'],
    });

    return [comments, total];
  }

  async findAllBySolution(solutionId: string, query: PaginationQueryDto): Promise<[Comment[], number]> {
    const { page = 1, limit = 10 } = query;
    const offset = (page - 1) * limit;

    const [comments, total] = await this.commentModel.findAndCountAll({
      where: { solutionId },
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      include: ['user'],
    });

    return [comments, total];
  }

  async findOne(id: string): Promise<Comment> {
    const comment = await this.commentModel.findByPk(id, {
      include: ['user'],
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return comment;
  }

  async update(id: string, updateCommentDto: UpdateCommentDto, userId: string): Promise<Comment> {
    const comment = await this.findOne(id);

    if (comment.userId !== userId) {
      throw new ForbiddenException('You do not have permission to update this comment');
    }

    await comment.update({
      ...updateCommentDto,
      isEdited: true,
    });

    return comment;
  }

  async remove(id: string, userId: string): Promise<void> {
    const comment = await this.findOne(id);

    if (comment.userId !== userId) {
      throw new ForbiddenException('You do not have permission to delete this comment');
    }

    await comment.destroy();
  }
}
