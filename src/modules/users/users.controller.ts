import { Controller, Get, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUserFromToken(@CurrentUser() user: User) {
    return await this.usersService.findOneById(user.id)
  }

  @UseGuards(JwtAuthGuard)
  @Put('status/dev')
  async updateDevStatus(@CurrentUser() user: User) {
    return await this.usersService.updateDevStatus(user.id)
  }
}
