import { Body, Controller, Get, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
import { AcceptReviewService } from "./accept-review.service";
import { CreateAcceptReviewDto, CreateAcceptReview } from "./dto/create-accept-review.dto";
import { CurrentUser } from "../auth/decorator/current-user.decorator";
import { User } from "../users/entities/user.entity";
import { ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";
import { AcceptReviewDto, AcceptReviewResponseDto } from "./dto/accept-review-response.dto";
import { JwtAuthGuard } from "../auth/guard/auth.guard";
import { ReviewRequestStatus } from "../review-request/entities/review-request.entity";
import type { Response } from "express";
import { UpdateAcceptReviewDto } from "./dto/update-accept-review.dto";
import { AcceptReviewStatuses } from "./entities/accept-review.entity";

@Controller('accepts-reviews')
export class AcceptReviewController {
  constructor(
    private readonly acceptReviewRequestService: AcceptReviewService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiCreatedResponse({
    type: AcceptReviewResponseDto
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
  @Put(':reviewId/:devId/reject')
  @ApiOkResponse({
    type: AcceptReviewResponseDto
  })
  async rejectAcceptReviewStatus(
    @Param('reviewId') reviewId: string,
    @Param('devId') devId: string,
    @CurrentUser() user: User,
    @Res() res: Response
  ) {
    const updateAcceptReview: UpdateAcceptReviewDto = {
      devId,
      reviewId,
      userId: user.id,
      acceptReviewStatus: AcceptReviewStatuses.REJECTED,
      reviewStatus: ReviewRequestStatus.OPEN
    }

    const response = await this.acceptReviewRequestService.updateAcceptReviewStatus(updateAcceptReview)

    return res.status(200).json(response)
  }

  @UseGuards(JwtAuthGuard)
  @Put(':reviewId/:devId/accept')
  @ApiOkResponse({
    type: AcceptReviewResponseDto
  })
  async acceptAcceptReviewStatus(
    @Param('reviewId') reviewId: string,
    @Param('devId') devId: string,
    @CurrentUser() user: User,
    @Res() res: Response
  ) {
    const updateAcceptReview: UpdateAcceptReviewDto = {
      devId,
      reviewId,
      userId: user.id,
      acceptReviewStatus: AcceptReviewStatuses.ACCEPTED,
      reviewStatus: ReviewRequestStatus.IN_PROGRESS
    }

    const response = await this.acceptReviewRequestService.updateAcceptReviewStatus(updateAcceptReview)

    return res.status(200).json(response)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOkResponse({
    type: AcceptReviewDto
  })
  async findAllByDev(
    @CurrentUser() user: User,
    @Res() res: Response
  ) {
    const acceptsReviews = await this.acceptReviewRequestService.findAllByDev(user.id)

    return res.status(200).json(acceptsReviews)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':reviewId')
  @ApiOkResponse({
    type: [AcceptReviewDto]
  })
  async findAllPendingByReviewId(
    @Param('reviewId') reviewId: string,
    @CurrentUser() user: User,
    @Res() res: Response
  ) {
    const acceptsReviews = await this.acceptReviewRequestService.findAllPending(reviewId, user.id)

    return res.status(200).json(acceptsReviews)
  }
}
