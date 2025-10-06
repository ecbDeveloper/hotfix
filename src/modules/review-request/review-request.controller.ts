import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ReviewRequestService } from './review-request.service';
import { CreateReviewRequestDto } from './dto/create-review-request.dto';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { JwtAuthGuard } from '../auth/guard/auth.guard';

@Controller('review-request')
export class ReviewRequestController {
  constructor(private readonly reviewRequestService: ReviewRequestService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createReviewRequestDto: CreateReviewRequestDto, @CurrentUser() user: User) {
    return this.reviewRequestService.create({
      ...createReviewRequestDto,
      userId: user.id,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewRequestService.findOne(+id);
  }

  @Delete(':id')
  cancelReviewRequest(@Param('id') id: string) {
    return this.reviewRequestService.remove(+id);
  }
}
