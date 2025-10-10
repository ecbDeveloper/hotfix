import { PartialType } from '@nestjs/swagger';
import { CreateSolutionReviewDto } from './create-solution-review.dto';

export class UpdateSolutionReviewDto extends PartialType(CreateSolutionReviewDto) {}
