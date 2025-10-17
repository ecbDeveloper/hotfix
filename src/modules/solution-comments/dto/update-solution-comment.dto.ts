import { PartialType } from '@nestjs/swagger';
import { CreateSolutionCommentDto } from './create-solution-comment.dto';

export class UpdateSolutionCommentDto extends PartialType(CreateSolutionCommentDto) {
  userId: string;
}
