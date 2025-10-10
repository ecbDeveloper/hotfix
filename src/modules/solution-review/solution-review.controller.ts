import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SolutionReviewService } from './solution-review.service';
import { CreateSolutionReviewDto } from './dto/create-solution-review.dto';
import { UpdateSolutionReviewDto } from './dto/update-solution-review.dto';

@Controller('solution-review')
export class SolutionReviewController {
  constructor(private readonly solutionReviewService: SolutionReviewService) {}

  @Post()
  create(@Body() createSolutionReviewDto: CreateSolutionReviewDto) {
    return this.solutionReviewService.create(createSolutionReviewDto);
  }

  @Get()
  findAll() {
    return this.solutionReviewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.solutionReviewService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSolutionReviewDto: UpdateSolutionReviewDto) {
    return this.solutionReviewService.update(+id, updateSolutionReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.solutionReviewService.remove(+id);
  }
}
