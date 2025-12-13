import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { ReviewRequestModule } from '../review-request/review-request.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { UserLanguage } from 'src/common/entities/user-language.entity';
import { Language } from 'src/common/entities/language.entity';
import { Role } from 'src/common/entities/role.entity';
import { DevStatus } from 'src/common/entities/dev-status.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Language, UserLanguage, Role, DevStatus]),
    forwardRef(() => ReviewRequestModule)
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService]
})
export class UsersModule { }
