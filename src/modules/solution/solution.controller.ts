import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { DefaultResponse } from "src/common/dto/default-response.dto";
import { CreateSolutionDto } from "./dto/create-solution.dto";
import { SolutionService } from "./solution.service";
import { CurrentUser } from "../auth/decorator/current-user.decorator";
import { User } from "../users/entities/user.entity";
import type { Response } from "express";
import { AcceptSolutionDto } from "./dto/accept-solution.dto";
import { UpdateSolutiondDto } from "./dto/update-solution.dto";
import { SolutionDto } from "./dto/solution.dto";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";

@Controller('solutions')
@ApiTags('Solutions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class SolutionController {
  constructor(
    private readonly solutionsService: SolutionService
  ) { }

  @Post()
  @ApiCreatedResponse({
    type: DefaultResponse,
    description: 'Solution created successfully'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async create(
    @Body() createSolutionDto: CreateSolutionDto,
  ): Promise<DefaultResponse> {
    return await this.solutionsService.create(createSolutionDto);
  }

  @Patch('accept/:id')
  @ApiOkResponse({
    type: DefaultResponse,
    description: 'Solution accepted successfully'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async acceptSolution(
    @Param('id') solutionId: string,
    @CurrentUser() user: User,
  ): Promise<DefaultResponse> {
    const acceptSolutionDto: AcceptSolutionDto = {
      userId: user.id,
      solutionId
    };
    return await this.solutionsService.acceptSolution(acceptSolutionDto);
  }

  @Patch(':id')
  @ApiOkResponse({
    type: DefaultResponse,
    description: 'Solution updated successfully'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async updateSolutionText(
    @Param('id') solutionId: string,
    @Body() updateSolutiondDto: UpdateSolutiondDto,
    @CurrentUser() user: User,
  ): Promise<DefaultResponse> {
    return await this.solutionsService.updateSolution(updateSolutiondDto.solution, solutionId, user.id);
  }

  @Get('by-review/:reviewId')
  @ApiOkResponse({
    type: SolutionDto,
    description: 'Get solution by review ID'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async findSolutionByReviewId(
    @Param('reviewId') reviewId: string,
  ): Promise<SolutionDto | null> {
    return await this.solutionsService.findOneByReview(reviewId);
  }

  @Get(':id')
  @ApiOkResponse({ 
    type: SolutionDto,
    description: 'Get solution by ID'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async findById(
    @Param('id') solutionId: string,
  ): Promise<SolutionDto | null> {
    return await this.solutionsService.findOneById(solutionId);
  }
}
