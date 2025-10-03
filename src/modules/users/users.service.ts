import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { UserCreateInput } from './users.type';


@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) { }

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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
}
