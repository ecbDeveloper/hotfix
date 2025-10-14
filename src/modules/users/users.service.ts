import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserCreateInput } from './users.type';
import { DevStatuses, UserRole } from './entities/user.entity';
import { DefaultResponse } from 'src/common/dto/default-response.dto';
import { ReviewRequestGateway } from '../review-request/review-request.gateway';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserWithLanguages } from './dto/response-user.dto';
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
      await this.reviewRequestsGateway.addToSomeRoom(userId, 'work-room')
    } else {
      await this.reviewRequestsGateway.removeFromSomeRoom(userId, 'work-room')
    }

    return {
      id: userId,
      message: `User now is ${DevStatuses[devStatus]}`
    }
  }

  async findAll(limit: number, offset: number): Promise<PaginatedDto<UserWithLanguages>> {
    const { total, results } = await this.usersRepository.findAll(limit, offset)


    const resultsTyped = results as unknown as UserWithLanguages[];

    return {
      limit,
      offset,
      total,
      results: resultsTyped
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
