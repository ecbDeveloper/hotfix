import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { DefaultResponse } from "src/common/dto/default-response.dto";
import { CreateSolutionDto } from "./dto/create-solution.dto";
import { SolutionService } from "./solution.service";
import { CurrentUser } from "../auth/decorator/current-user.decorator";
import { User } from "../users/entities/user.entity";
import { ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";
import { UpdateSolutiondDto } from "./dto/update-solution.dto";
import { SolutionDto } from "./dto/solution.dto";
import { AcceptSolutionDto } from "./dto/accept-solution.dto";

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
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: DefaultResponse
  })
  async acceptSolution(
    @Param('solutionId') solutionId: string,
    @CurrentUser() user: User,
  ) {
    const acceptSolutionDto: AcceptSolutionDto = {
      userId: user.id,
      solutionId
    }

    return await this.solutionsService.acceptSolution(acceptSolutionDto)
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: DefaultResponse
  })
  async updateSolutionText(
    @Param('id') solutionId: string,
    @Body() updateSolutiondDto: UpdateSolutiondDto,
    @CurrentUser() user: User,
  ) {
    return await this.solutionsService.updateSolution(updateSolutiondDto.solution, solutionId, user.id)
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: SolutionDto })
  async findById(
    @Param('id') solutionId: string,
  ) {
    return await this.solutionsService.findOneById(solutionId)
  }
}
