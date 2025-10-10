import { Test, TestingModule } from '@nestjs/testing';
import { SolutionReviewController } from './solution-review.controller';
import { SolutionReviewService } from './solution-review.service';

describe('SolutionReviewController', () => {
  let controller: SolutionReviewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolutionReviewController],
      providers: [SolutionReviewService],
    }).compile();

    controller = module.get<SolutionReviewController>(SolutionReviewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
