import { Controller, Post, Body, UseGuards, Get, Query, Res, Param, Delete } from '@nestjs/common';
import { ReviewRequestService } from './review-request.service';
import { CreateReviewRequestDto } from './dto/create-review-request.dto';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { DefaultResponse } from 'src/common/dto/default-response.dto';
import { ApiPaginatedResponse } from 'src/common/decorators/paginated-response.decorator';
import { ReviewRequestDto } from './dto/response-review-request.dto';
import type { Response } from 'express';

@Controller('review-requests')
export class ReviewRequestController {
  constructor(private readonly reviewRequestService: ReviewRequestService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    type: DefaultResponse
  })
  create(@Body() createReviewRequestDto: CreateReviewRequestDto, @CurrentUser() user: User) {
    return this.reviewRequestService.create({
      ...createReviewRequestDto,
      userId: user.id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiPaginatedResponse(ReviewRequestDto)
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'offset', required: false, type: Number, example: 0 })
  async findAllByUserId(
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
    @CurrentUser() user: User,
    @Res() res: Response
  ) {
    const userReviewRequests = await this.reviewRequestService.findAllByUserId(user.id, limit, offset)

    return res.status(200).json(userReviewRequests)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOkResponse({ type: ReviewRequestDto })
  async findOne(
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const reviewRequest = await this.reviewRequestService.findOneById(id);
    return res.status(200).json(reviewRequest);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @CurrentUser() user: User,
    @Res() res: Response
  ) {
    const response = await this.reviewRequestService.checkOwnerAndCancel(id, user.id)

    return res.status(200).json(response)
  }
}
