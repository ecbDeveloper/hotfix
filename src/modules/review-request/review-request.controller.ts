import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ReviewRequestService } from './review-request.service';
import { CreateReviewRequestDto } from './dto/create-review-request.dto';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { ApiOkResponse } from '@nestjs/swagger';
import { DefaultResponse } from 'src/common/dto/default-response.dto';

@Controller('review-request')
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

}
