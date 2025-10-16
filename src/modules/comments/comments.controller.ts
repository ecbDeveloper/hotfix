import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete,
  UseGuards,
  Query,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { Comment } from './entities/comment.entity';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { ApiPaginatedResponse } from '../../common/decorators/paginated-response.decorator';

@ApiTags('comments')
@Controller('comments')
@UseGuards(JwtAuthGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo comentário' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Comment })
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createCommentDto: CreateCommentDto,
    @GetUser() user: User,
  ): Promise<Comment> {
    return this.commentsService.create(createCommentDto, user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os comentários' })
  @ApiPaginatedResponse(Comment)
  findAll(@Query() query: PaginationQueryDto) {
    return this.commentsService.findAll(query);
  }

  @Get('solution/:solutionId')
  @ApiOperation({ summary: 'Listar comentários de uma solução específica' })
  @ApiPaginatedResponse(Comment)
  findAllBySolution(
    @Param('solutionId', ParseUUIDPipe) solutionId: string,
    @Query() query: PaginationQueryDto,
  ) {
    return this.commentsService.findAllBySolution(solutionId, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um comentário específico' })
  @ApiResponse({ status: HttpStatus.OK, type: Comment })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.commentsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um comentário' })
  @ApiResponse({ status: HttpStatus.OK, type: Comment })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @GetUser() user: User,
  ) {
    return this.commentsService.update(id, updateCommentDto, user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um comentário' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ) {
    return this.commentsService.remove(id, user.id);
  }
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
