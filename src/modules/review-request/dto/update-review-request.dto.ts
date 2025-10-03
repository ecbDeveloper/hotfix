import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewRequestDto } from './create-review-request.dto';

export class UpdateReviewRequestDto extends PartialType(CreateReviewRequestDto) {}
