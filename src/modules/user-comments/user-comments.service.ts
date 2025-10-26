import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserCommentDto } from './dto/create-user-comment.dto';
import { UpdateUserCommentDto } from './dto/update-user-comment.dto';
import { UserComment } from './entities/user-comment.entity';

@Injectable()
export class UserCommentsService {
  constructor(
    @InjectModel(UserComment)
    private readonly userCommentModel: typeof UserComment,
  ) {}

  async create(createUserCommentDto: CreateUserCommentDto): Promise<UserComment> {
    return await this.userCommentModel.create({ ...createUserCommentDto });
  }

  async findAll(): Promise<UserComment[]> {
    return await this.userCommentModel.findAll();
  }

  async findOne(id: string): Promise<UserComment> {
    return await this.userCommentModel.findByPk(id);
  }

  async update(id: string, updateUserCommentDto: UpdateUserCommentDto): Promise<[number]> {
    return await this.userCommentModel.update(updateUserCommentDto, {
      where: { id }
    });
  }

  async remove(id: string): Promise<number> {
    return await this.userCommentModel.destroy({
      where: { id }
    });
  }
}