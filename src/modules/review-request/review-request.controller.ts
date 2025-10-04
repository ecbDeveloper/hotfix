import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ReviewRequestService } from './review-request.service';
import { CreateReviewRequestDto } from './dto/create-review-request.dto';

@Controller('review-request')
export class ReviewRequestController {
  constructor(private readonly reviewRequestService: ReviewRequestService) { }

  @Post()
  create(@Body() createReviewRequestDto: CreateReviewRequestDto) {
    return this.reviewRequestService.create(createReviewRequestDto);
  }

  @Get()
  findAll() {
    return this.reviewRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewRequestService.findOne(+id);
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewRequestService.remove(+id);
  }
}
