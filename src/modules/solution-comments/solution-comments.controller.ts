import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { CreateSolutionCommentDto } from './dto/create-solution-comment.dto';
import { UpdateSolutionCommentDto } from './dto/update-solution-comment.dto';
import { SolutionCommentsService } from './solution-comments.service';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { User } from '../users/entities/user.entity';
import type { Response } from 'express';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { DefaultResponse } from 'src/common/dto/default-response.dto';
import { SolutionCommentDto } from './dto/solution-comment.dto';

@Controller('solution_comments')
export class SolutionCommentsController {
  constructor(private readonly solutionCommentsService: SolutionCommentsService) { }

  @Post()
  @ApiCreatedResponse({
    type: DefaultResponse
  })
  async create(
    @Body() createCommentDto: CreateSolutionCommentDto,
    @CurrentUser() user: User
  ) {
    const createComment: CreateSolutionCommentDto = {
      ...createCommentDto,
      userId: user.id,
    }

    return await this.solutionCommentsService.create(createComment);
  }

  @Get(':solutionId')
  @ApiCreatedResponse({
    type: [SolutionCommentDto]
  })
  findAllBySolution(
    @Param('solutionId') solutionId: string,
    @CurrentUser() user: User,
    @Res() res: Response
  ) {
    const response = this.solutionCommentsService.findAllBySolution(solutionId, user.id);

    return res.status(200).json(response)
  }

  @Get(':id')
  @ApiCreatedResponse({
    type: [SolutionCommentDto]
  })
  async findOne(
    @Param('id') id: string,
    @CurrentUser() user: User,
    @Res() res: Response
  ) {
    const response = await this.solutionCommentsService.findOneById(id, user.id);

    return res.status(200).json(response)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateSolutionCommentDto,
    @CurrentUser() user: User,
    @Res() res: Response
  ) {
    const updateComment: UpdateSolutionCommentDto = {
      ...updateCommentDto,
      userId: user.id
    }
    const response = await this.solutionCommentsService.update(id, updateComment);

    res.status(200).json(response)
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: User,
    @Res() res: Response
  ) {
    const response = await this.solutionCommentsService.remove(id, user.id);

    return res.status(200).json(response)
  }
}
