import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from "@nestjs/common";
import { AcceptReviewService } from "./accept-review.service";
import { CreateAcceptReviewDto, CreateAcceptReview } from "./dto/create-accept-review.dto";
import { CurrentUser } from "../auth/decorator/current-user.decorator";
import { User } from "../users/entities/user.entity";
import { ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";
import { AcceptReviewDto, AcceptReviewResponseDto } from "./dto/accept-review-response.dto";
import { JwtAuthGuard } from "../auth/guard/auth.guard";
import { ReviewRequestStatus } from "../review-request/entities/review-request.entity";
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
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: AcceptReviewResponseDto
  })
  async rejectAcceptReviewStatus(
    @Param('reviewId') reviewId: string,
    @Param('devId') devId: string,
    @CurrentUser() user: User,
  ) {
    const updateAcceptReview: UpdateAcceptReviewDto = {
      devId,
      reviewId,
      userId: user.id,
      acceptReviewStatus: AcceptReviewStatuses.REJECTED,
      reviewStatus: ReviewRequestStatus.OPEN
    }

    return await this.acceptReviewRequestService.updateAcceptReviewStatus(updateAcceptReview)
  }

  @UseGuards(JwtAuthGuard)
  @Put(':reviewId/:devId/accept')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: AcceptReviewResponseDto
  })
  async acceptAcceptReviewStatus(
    @Param('reviewId') reviewId: string,
    @Param('devId') devId: string,
    @CurrentUser() user: User,
  ) {
    const updateAcceptReview: UpdateAcceptReviewDto = {
      devId,
      reviewId,
      userId: user.id,
      acceptReviewStatus: AcceptReviewStatuses.ACCEPTED,
      reviewStatus: ReviewRequestStatus.IN_PROGRESS
    }

    return await this.acceptReviewRequestService.updateAcceptReviewStatus(updateAcceptReview)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: AcceptReviewDto
  })
  async findAllByDev(
    @CurrentUser() user: User,
  ) {
    return await this.acceptReviewRequestService.findAllByDev(user.id)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':reviewId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: [AcceptReviewDto]
  })
  async findAllPendingByReviewId(
    @Param('reviewId') reviewId: string,
    @CurrentUser() user: User,
  ) {
    return await this.acceptReviewRequestService.findAllPending(reviewId, user.id)
  }
}
