import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UserCreateInput } from './users.type';
import { UserLanguage } from 'src/common/entities/user-language.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { Language } from 'src/common/entities/language.entity';


@Injectable()
export class UsersRepository {
  async findOneByEmail(email: string) {
    const user = await User.findOne({
      where: { email: email, active: true },
      raw: true
    });

    return user;
  }

  async findOneById(userId: string) {
    const user = await User.findOne({
      where: { id: userId, active: true },
      include: [
        {
          model: Language,
          through: { attributes: [] },
        },
      ],
      attributes: { exclude: ['password'] },
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

    await UserLanguage.bulkCreate(records)
  }

  async updateDevStatus(userId: string, status: number) {
    await User.update({ devStatusId: status }, {
      where: {
        id: userId,
        active: true
      }
    })
  }

  async findAll(limit: number, offset: number) {
    const { count, rows } = await User.findAndCountAll({
      limit,
      offset,
      where: { active: true },
      include: [
        {
          model: Language,
          through: { attributes: [] },
        },
      ],
      attributes: { exclude: ['password'] }
    })

    return {
      total: count,
      results: rows
    }
  }

  async update(updateUserDto: UpdateUserDto) {
    return await User.update(updateUserDto, {
      where: {
        id: updateUserDto.userId,
        active: true
      }
    })
  }

  async delete(userId: string) {
    return await User.update({ active: false }, {
      where: {
        id: userId,
        active: true
      }
    })
  }
} 
