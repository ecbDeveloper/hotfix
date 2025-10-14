import { Body, Controller, Get, Param, Patch, Post, Res } from "@nestjs/common";
import { DefaultResponse } from "src/common/dto/default-response.dto";
import { CreateSolutionDto } from "./dto/create-solution.dto";
import { SolutionService } from "./solution.service";
import { CurrentUser } from "../auth/decorator/current-user.decorator";
import { User } from "../users/entities/user.entity";
import type { Response } from "express";
import { AcceptSolutionDto } from "./dto/accept-solutin.dot";
import { ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";
import { UpdateSolutiondDto } from "./dto/update-solution.dto";
import { SolutionDto } from "./dto/solution.dto";

@Controller('solutions-reviews')
export class SolutionController {
  constructor(
    private readonly solutionsService: SolutionService
  ) { }

  @Post()
  @ApiCreatedResponse({
    type: DefaultResponse
  })
  async create(
    @Body() createSolutionDto: CreateSolutionDto,
  ): Promise<DefaultResponse> {
    return await this.solutionsService.create(createSolutionDto)
  }

  @Patch(':id/accept')
  @ApiOkResponse({
    type: DefaultResponse
  })
  async acceptSolution(
    @Param('solutionId') solutionId: string,
    @CurrentUser() user: User,
    @Res() res: Response,
  ) {
    const acceptSolutionDto: AcceptSolutionDto = {
      userId: user.id,
      solutionId
    }
    const response = await this.solutionsService.acceptSolution(acceptSolutionDto)

    return res.status(200).json(response)
  }

  @Patch(':id')
  @ApiOkResponse({
    type: DefaultResponse
  })
  async updateTextSolution(
    @Param('solutionId') solutionId: string,
    @Body() updateSolutiondDto: UpdateSolutiondDto,
    @CurrentUser() user: User,
    @Res() res: Response,
  ) {
    const response = await this.solutionsService.updateSolution(updateSolutiondDto.solution, solutionId, user.id)

    return res.status(200).json(response)
  }

  @Get(':reviewId')
  @ApiOkResponse({
    type: SolutionDto
  })
  async findSolutionByReviewId(
    @Param('reviewId') reviewId: string,
    @Res() res: Response
  ) {
    const response = await this.solutionsService.findOneByReview(reviewId)

    return res.status(200).json(response)
  }
}
