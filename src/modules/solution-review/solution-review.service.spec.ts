import { Test, TestingModule } from '@nestjs/testing';
import { SolutionReviewService } from './solution-review.service';

describe('SolutionReviewService', () => {
  let service: SolutionReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SolutionReviewService],
    }).compile();

    service = module.get<SolutionReviewService>(SolutionReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
