import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { PaginatedDto } from 'src/common/dto/paginated-response.dto';
import { ReviewRequest } from '../review-request/entities/review-request.entity';
import { Solution } from '../solution/entities/solution.entity';
import { User } from '../users/entities/user.entity';
import { SearchDevsDto, SearchReviewsDto, SearchSolutionsDto } from './dto/search.dto';
import { ReviewRequestDto } from '../review-request/dto/review-request.dto';
import { SolutionDto } from '../solution/dto/solution.dto';
import { UserResponseDto } from '../users/dto/response-user.dto';

@Injectable()
export class SearchService {
  async searchDevs(query: SearchDevsDto): Promise<PaginatedDto<UserResponseDto>> {
    const where: any = {
      roleId: 2, // Role DEV
    };

    if (query.languages?.length) {
      where['$userLanguages.languageId$'] = {
        [Op.in]: query.languages,
      };
    }

    if (query.devStatus) {
      where.devStatus = query.devStatus;
    }

    const { count, rows } = await User.findAndCountAll({
      where,
      include: ['userLanguages'],
      distinct: true,
    });

    return {
      results: rows.map(user => ({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roleId: user.roleId,
        devStatus: user.devStatus,
        languages: user.userLanguages.map(ul => ul.languageId),
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      })),
      total: count,
      limit: 10,
      offset: 0
    };
  }

  async searchReviews(query: SearchReviewsDto): Promise<PaginatedDto<ReviewRequestDto>> {
    const where: any = {};

    if (query.languages?.length) {
      where.language = {
        [Op.in]: query.languages,
      };
    }

    if (query.minPrice) {
      where.price = {
        ...where.price,
        [Op.gte]: query.minPrice,
      };
    }

    if (query.maxPrice) {
      where.price = {
        ...where.price,
        [Op.lte]: query.maxPrice,
      };
    }

    const { count, rows } = await ReviewRequest.findAndCountAll({
      where,
      include: ['languageEntity'],
    });

    return {
      results: rows.map(review => ({
        id: review.id,
        userId: review.userId,
        title: review.title,
        description: review.description,
        price: review.price,
        codeSnippet: review.codeSnippet,
        status: review.status,
        language: review.language,
        paymentMethod: review.paymentMethod,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt
      })),
      total: count,
      limit: 10,
      offset: 0
    };
  }

  async searchSolutions(query: SearchSolutionsDto): Promise<PaginatedDto<SolutionDto>> {
    const where: any = {};

    if (query.searchText) {
      where.solution = {
        [Op.iLike]: `%${query.searchText}%`,
      };
    }

    if (query.languages?.length) {
      where['$reviewRequest.language$'] = {
        [Op.in]: query.languages,
      };
    }

    const { count, rows } = await Solution.findAndCountAll({
      where,
      include: ['reviewRequest'],
    });

    return {
      results: rows.map(solution => ({
        id: solution.id,
        reviewId: solution.reviewId,
        devId: solution.devId,
        solution: solution.solution,
        acceptedSolution: solution.acceptedSolution,
        createdAt: solution.createdAt,
        updatedAt: solution.updatedAt
      })),
      total: count,
      limit: 10,
      offset: 0
    };
  }
}