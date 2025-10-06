import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserCreateInput } from './users.type';
import { DevStatuses, UserRole } from './entities/user.entity';
import { DefaultResponse } from 'src/common/dto/default-response.dto';
import { ReviewRequestGateway } from '../review-request/review-request.gateway';


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

  async updateDevStatus(userId: string): Promise<DefaultResponse> {
    const user = await this.findOneById(userId)
    if (!user) {
      throw new NotFoundException('User not found')
    }

    if (user.roleId === UserRole.CLIENT) {
      throw new UnprocessableEntityException('User must be a Dev to update your working status')
    }

    const newStatus = user.devStatusId === DevStatuses.WORKING ? DevStatuses.RESTING : DevStatuses.WORKING;

    await this.usersRepository.updateDevStatus(userId, newStatus)

    if (newStatus === DevStatuses.WORKING) {
      await this.reviewRequestsGateway.addToWorkRoom(userId)
    } else {
      await this.reviewRequestsGateway.removeFromWorkRoom(userId)
    }

    return {
      id: userId,
      message: `User is now ${DevStatuses[newStatus]}`
    }
  }
}
