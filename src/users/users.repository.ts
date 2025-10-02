import { SignupDto } from 'src/auth/dto/signup.dto';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  async findOneByEmailRepo(email: string) {
    const user = await User.findOne({
      where: { email },
    });

    return user;
  }

  async create(signUpDto: SignupDto) {
    const user = await User.create(signUpDto);

    return user;
  }
}
