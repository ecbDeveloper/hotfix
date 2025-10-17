import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { SearchService } from './search.service';
import { SearchDevsDto, SearchReviewsDto, SearchSolutionsDto } from './dto/search.dto';
import { PaginatedDto } from 'src/common/dto/paginated-response.dto';
import { User } from '../users/dto/response-user.dto';
import { ReviewRequestDto } from '../review-request/dto/review-request.dto';
import { SolutionDto } from '../solution/dto/solution.dto';

@Controller('search')
@ApiTags('Search')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('devs')
  @ApiOkResponse({
    type: PaginatedDto,
    description: 'Lista de desenvolvedores encontrados'
  })
  async searchDevs(
    @Query() query: SearchDevsDto,
  ): Promise<PaginatedDto<User>> {
    return await this.searchService.searchDevs(query);
  }

  @Get('reviews')
  @ApiOkResponse({
    type: PaginatedDto,
    description: 'Lista de pedidos de review encontrados'
  })
  async searchReviews(
    @Query() query: SearchReviewsDto,
  ): Promise<PaginatedDto<ReviewRequestDto>> {
    return await this.searchService.searchReviews(query);
  }

  @Get('solutions')
  @ApiOkResponse({
    type: PaginatedDto,
    description: 'Lista de soluções encontradas'
  })
  async searchSolutions(
    @Query() query: SearchSolutionsDto,
  ): Promise<PaginatedDto<SolutionDto>> {
    return await this.searchService.searchSolutions(query);
  }
}