import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UserCreateInput } from './users.type';
import { UserLanguage } from 'src/common/entities/user-language.entity';


@Injectable()
export class UsersRepository {
  async findOneByEmail(email: string) {
    const user = await User.findOne({
      where: { email: email },
    });

    return user;
  }

  async create(userData: UserCreateInput) {
    const user = await User.create(userData);

    return user.id;
  }

  async insertLanguage(userId: string, languages: number[]) {
    const records = languages.map((languageId) => (
      {
        userId,
        language: languageId
      }
    ))

    console.log(records)

    await UserLanguage.bulkCreate(records)
  }
} 
