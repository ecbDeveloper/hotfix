import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { SolutionCommentsRepository } from './solution-comments.repository';
import { CreateSolutionCommentDto } from './dto/create-solution-comment.dto';
import { UpdateSolutionCommentDto } from './dto/update-solution-comment.dto';
import { SolutionService } from '../solution/solution.service';
import { AcceptReviewService } from '../accept-review/accept-review.service';
import { ReviewRequestService } from '../review-request/review-request.service';
import { DefaultResponse } from 'src/common/dto/default-response.dto';

@Injectable()
export class SolutionCommentsService {
	constructor(
		private readonly solutionCommentsRepository: SolutionCommentsRepository,
		private readonly reviewRequestsService: ReviewRequestService,
		private readonly solutionService: SolutionService,
		private readonly acceptReviewService: AcceptReviewService,
	) { }

	async create(createSolutionCommentDto: CreateSolutionCommentDto): Promise<DefaultResponse> {
		const { solutionId } = createSolutionCommentDto

		const solution = await this.solutionService.findOneById(solutionId)
		if (!solution) {
			throw new NotFoundException('Solution not found')
		}

		if (solution.acceptedSolution === true) {
			throw new UnprocessableEntityException("You can't send a new comment to a closed solution")
		}

		const acceptReview = await this.acceptReviewService.findOneById(solution.acceptReviewId)

		const reviewRequest = await this.reviewRequestsService.findOneById(acceptReview.reviewId)

		if (createSolutionCommentDto.userId !== acceptReview.devId && createSolutionCommentDto.userId !== reviewRequest.userId) {
			throw new UnprocessableEntityException('To comment in a solution you need to be the dev or owner')
		}

		const comment = await this.solutionCommentsRepository.create(createSolutionCommentDto)

		return {
			id: comment.id,
			message: "Comment create successfully"
		}
	}

	async findAllBySolution(solutionId: string, userId: string) {
		const solution = await this.solutionService.findOneById(solutionId)
		if (!solution) {
			throw new NotFoundException('Solution not found')
		}

		const acceptReview = await this.acceptReviewService.findOneById(solution.acceptReviewId)

		const reviewRequest = await this.reviewRequestsService.findOneById(acceptReview.reviewId)

		if (userId !== acceptReview.devId && userId !== reviewRequest.userId) {
			throw new UnprocessableEntityException('To see all comment from a solution you need to be the dev or owner')
		}

		return this.solutionCommentsRepository.findAllBySolution(solutionId)
	}

	async findOne(id: string, userId: string) {
		const comment = await this.solutionCommentsRepository.findOneById(id)
		if (!comment) {
			throw new NotFoundException('Comment not found')
		}

		const solution = await this.solutionService.findOneById(comment.solutionId)
		if (!solution) {
			throw new NotFoundException('Solution not found')
		}

		const acceptReview = await this.acceptReviewService.findOneById(solution.acceptReviewId)

		const reviewRequest = await this.reviewRequestsService.findOneById(acceptReview.reviewId)

		if (userId !== acceptReview.devId && userId !== reviewRequest.userId) {
			throw new UnprocessableEntityException('To see one comment from a solution you need to be the dev or owner')
		}

		return comment
	}

	async update(id: string, updateCommentDto: UpdateSolutionCommentDto): Promise<DefaultResponse> {
		const comment = await this.findOne(id, updateCommentDto.userId)
		if (!comment) {
			throw new NotFoundException('Comment not found')
		}

		const createdAt = new Date(comment.createdAt as string);
		const diffMinutes = (Date.now() - createdAt.getTime()) / (1000 * 60);

		if (diffMinutes > 5) {
			throw new BadRequestException('The comment can only be edited up to 5 minutes after creation');
		}

		if (comment.userId !== updateCommentDto.userId) {
			throw new UnprocessableEntityException("You can't update a comment that's not your")
		}

		const solution = await this.solutionService.findOneById(comment.solutionId)
		if (!solution) {
			throw new NotFoundException('Solution not found')
		}

		if (solution.acceptedSolution === true) {
			throw new UnprocessableEntityException("You can't update a new comment to a closed solution")
		}

		await this.solutionCommentsRepository.update(id, updateCommentDto)

		return {
			id: id,
			message: 'Comment updated successfully'
		}
	}

	async remove(id: string, userId: string): Promise<DefaultResponse> {
		const comment = await this.findOne(id, userId)
		if (!comment) {
			throw new NotFoundException('Comment not found')
		}

		const createdAt = new Date(comment.createdAt as string);
		const diffMinutes = (Date.now() - createdAt.getTime()) / (1000 * 60);

		if (diffMinutes > 5) {
			throw new BadRequestException('The comment can only be removed up to 5 minutes after creation');
		}

		if (comment.userId !== userId) {
			throw new UnprocessableEntityException("You can't remove a comment that's not your")
		}

		const solution = await this.solutionService.findOneById(comment.solutionId)
		if (!solution) {
			throw new NotFoundException('Solution not found')
		}

		if (solution.acceptedSolution === true) {
			throw new UnprocessableEntityException("You can't remove a new comment to a closed solution")
		}

		await this.solutionCommentsRepository.remove(id)

		return {
			id: id,
			message: 'Comment removed successfully'
		}
	}
}
