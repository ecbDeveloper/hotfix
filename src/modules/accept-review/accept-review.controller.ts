import { Body, Controller, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
import { AcceptReviewService } from "./accept-review.service";
import { CreateAcceptReviewDto, CreateAcceptReview } from "./dto/create-accept-review.dto";
import { UpdateAcceptReview, UpdateAcceptReviewDto } from "./dto/update-accept-review.dto";
import { CurrentUser } from "../auth/decorator/current-user.decorator";
import { User } from "../users/entities/user.entity";
import { ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";
import { AcceptReviewResponse } from "./dto/accept-review-response.dto";
import type { Response } from "express";
import { JwtAuthGuard } from "../auth/guard/auth.guard";

@Controller('accepts-reviews')
export class AcceptReviewController {
  constructor(
    private readonly acceptReviewRequestService: AcceptReviewService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiCreatedResponse({
    type: AcceptReviewResponse
  })
  async create(
    @Body() createAcceptReviewDto: CreateAcceptReviewDto,
    @CurrentUser() user: User,
  ) {
    const createAcceptReview: CreateAcceptReview = {
      devId: user.id,
      reviewId: createAcceptReviewDto.reviewId
    }
    return await this.acceptReviewRequestService.create(createAcceptReview)
  }

  @UseGuards(JwtAuthGuard)
  @Put(':reviewId')
  @ApiOkResponse({
    type: AcceptReviewResponse
  })
  async cancelReviewProgress(
    @Param('reviewId') reviewId: string,
    @Body() updateAcceptReviewDto: UpdateAcceptReviewDto,
    @CurrentUser() user: User,
    @Res() res: Response
  ) {
    const updateAcceptReview: UpdateAcceptReview = {
      devId: user.id,
      reviewId: reviewId,
      inProgress: updateAcceptReviewDto.inProgress,
      reviewStatus: updateAcceptReviewDto.reviewStatus
    }

    const response = await this.acceptReviewRequestService.cancelAcceptReview(updateAcceptReview)

    return res.status(200).json(response)
  }
}
