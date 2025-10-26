import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserCommentsService } from './user-comments.service';
import { CreateUserCommentDto } from './dto/create-user-comment.dto';
import { UpdateUserCommentDto } from './dto/update-user-comment.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UserComment } from './entities/user-comment.entity';

@Controller('user-comments')
@ApiTags('User Comments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserCommentsController {
  constructor(private readonly userCommentsService: UserCommentsService) {}

  @Post()
  @ApiCreatedResponse({
    type: UserComment,
    description: 'Comment created successfully'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  create(@Body() createUserCommentDto: CreateUserCommentDto) {
    return this.userCommentsService.create(createUserCommentDto);
  }

  @Get()
  @ApiOkResponse({
    type: [UserComment],
    description: 'List all comments'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  findAll() {
    return this.userCommentsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    type: UserComment,
    description: 'Get comment by id'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  findOne(@Param('id') id: string) {
    return this.userCommentsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    type: UserComment,
    description: 'Update comment'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  update(@Param('id') id: string, @Body() updateUserCommentDto: UpdateUserCommentDto) {
    return this.userCommentsService.update(id, updateUserCommentDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Delete comment'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  remove(@Param('id') id: string) {
    return this.userCommentsService.remove(id);
  }
}