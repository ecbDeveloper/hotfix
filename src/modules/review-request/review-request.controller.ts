import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import type { ReviewRequest } from './entities/review-request.entity';
import { ReviewRequestService } from './review-request.service';
import { CreateReviewRequestDto } from './dto/create-review-request.dto';
import { ReviewRequestDto } from './dto/review-request.dto.js';
import { DefaultResponse } from 'src/common/dto/default-response.dto';
import { User } from '../users/entities/user.entity';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { PaginatedDto } from 'src/common/dto/paginated-response.dto';

@Controller('review-requests')
@ApiTags('Review Requests')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ReviewRequestController {
  constructor(
    private readonly reviewRequestService: ReviewRequestService
  ) { }

  @Post()
  @ApiCreatedResponse({
    type: DefaultResponse,
    description: 'Create a new review request'
  })
  async create(
    @Body() createReviewRequestDto: CreateReviewRequestDto,
    @CurrentUser() user: User,
  ): Promise<DefaultResponse> {
    return await this.reviewRequestService.create(createReviewRequestDto, user);
  }

  @Get()
  @ApiOkResponse({
    type: PaginatedDto,
    description: 'List all review requests with pagination'
  })
  async findAll(
    @Query('limit') limit?: number,
    @Query('offset') offset?: number
  ): Promise<PaginatedDto<ReviewRequestDto>> {
    return await this.reviewRequestService.findAll(limit, offset);
  }

  @Get('by-user')
  @ApiOkResponse({
    type: PaginatedDto,
    description: 'List review requests by current user with pagination'
  })
  async findByUser(
    @CurrentUser() user: User,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number
  ): Promise<PaginatedDto<ReviewRequestDto>> {
    return await this.reviewRequestService.findByUser(user.id, limit, offset);
  }

  @Get(':id')
  @ApiOkResponse({
    type: ReviewRequestDto,
    description: 'Get review request by ID'
  })
  @ApiParam({ name: 'id', description: 'Review request ID' })
  async findOne(@Param('id') id: string): Promise<ReviewRequest | null> {
    return await this.reviewRequestService.findOneById(id);
  }

  @Delete(':id')
  @ApiOkResponse({
    type: DefaultResponse,
    description: 'Cancel review request'
  })
  @ApiParam({ name: 'id', description: 'Review request ID' })
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: User
  ): Promise<DefaultResponse> {
    return await this.reviewRequestService.checkOwnerAndCancel(id, user.id);
  }
}