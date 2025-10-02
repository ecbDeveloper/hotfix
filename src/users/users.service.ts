import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignupDto } from 'src/auth/dto/signup.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) { }

  async create(signupDto: SignupDto) {
    const user = await this.usersRepository.create(signupDto);

    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.usersRepository.findOneByEmailRepo(email);
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
}
