import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserCreateInput } from './users.type';
import { DevStatuses, UserRole } from './entities/user.entity';
import { DefaultResponse } from 'src/common/dto/default-response.dto';
import { ReviewRequestGateway } from '../review-request/review-request.gateway';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/response-user.dto';
import { PaginatedDto } from 'src/common/dto/paginated-response.dto';


@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly reviewRequestsGateway: ReviewRequestGateway
  ) { }

  async create(userData: UserCreateInput) {
    const user = await this.usersRepository.create(userData);

    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.usersRepository.findOneByEmail(email);

    return user;
  }

  async insertLanguages(userId: string, languages: number[]) {
    await this.usersRepository.insertLanguage(userId, languages)

    return
  }

  async findOneById(userId: string) {
    const user = await this.usersRepository.findOneById(userId);
    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user;
  }

  async updateDevStatus(userId: string, devStatus: DevStatuses): Promise<DefaultResponse> {
    const user = await this.findOneById(userId)
    if (!user) {
      throw new NotFoundException('User not found')
    }

    if (user.roleId === UserRole.CLIENT) {
      throw new UnprocessableEntityException('User must be a Dev to update your working status')
    }

    await this.usersRepository.updateDevStatus(userId, devStatus)

    if (devStatus === DevStatuses.WORKING) {
      await this.reviewRequestsGateway.addToWorkRoom(userId)
    } else {
      await this.reviewRequestsGateway.removeFromWorkRoom(userId)
    }

    return {
      id: userId,
      message: `User is now ${DevStatuses[devStatus]}`
    }
  }

  async findAll(limit: number, offset: number): Promise<PaginatedDto<UserResponseDto>> {
    const { total, results } = await this.usersRepository.findAll(limit, offset)

    const dtoResults = results.map(user => {
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roleId: user.roleId,
        devStatusId: user.devStatusId,
        languages: user.languages?.map(lang => lang.description),
      } as UserResponseDto;
    });

    return {
      limit,
      offset,
      total,
      results: dtoResults,
    }
  }

  async update(updateUserDto: UpdateUserDto): Promise<DefaultResponse> {
    const [affectedRows] = await this.usersRepository.update(updateUserDto)
    if (affectedRows === 0) {
      throw new NotFoundException('User not found, or deactivate')
    }

    return {
      id: updateUserDto.userId,
      message: "User updated successfully"
    }
  }

  async delete(userId: string): Promise<DefaultResponse> {
    const [affectedRows] = await this.usersRepository.delete(userId)
    if (affectedRows === 0) {
      throw new NotFoundException('User not found, or deactivate')
    }

    return {
      id: userId,
      message: "User deleted successfully"
    }
  }
}
