import { Body, Controller, Param, Post, Put } from "@nestjs/common";
import { AcceptReviewService } from "./accept-review.service";
import { CreateAcceptReviewDto } from "./dto/create-accept-review.dto";
import { UpdateAcceptReview, UpdateAcceptReviewDto } from "./dto/update-accept-review.dto";

@Controller('accepts-reviews')
export class AcceptReviewController {
  constructor(
    private readonly acceptReviewRequestService: AcceptReviewService
  ) { }

  @Post()
  async create(@Body() createAcceptReviewDto: CreateAcceptReviewDto) {
    return await this.acceptReviewRequestService.create(createAcceptReviewDto)
  }

  @Put(':devId/:reviewId')
  async updateReviewProgress(
    @Param('devId') devId: string,
    @Param('reviewId') reviewId: string,
    @Body() updateAcceptReviewDto: UpdateAcceptReviewDto
  ) {
    const updateAcceptReview: UpdateAcceptReview = {
      devId: devId,
      reviewId: reviewId,
      inProgress: updateAcceptReviewDto.inProgress,
      reviewStatus: updateAcceptReviewDto.reviewStatus
    }

    return this.acceptReviewRequestService.updateReviewProgress(updateAcceptReview)
  }
}
