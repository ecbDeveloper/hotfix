import { Body, Controller, Get, Put, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { DevStatuses, User } from './entities/user.entity';
import { ApiOkResponse } from '@nestjs/swagger';
import { DefaultResponse } from 'src/common/dto/default-response.dto';
import type { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOkResponse({
    type: User
  })
  async getUserFromToken(@CurrentUser() user: User, @Res() res: Response) {
    const response = await this.usersService.findOneById(user.id)

    return res.status(200).json(response)
  }

  @UseGuards(JwtAuthGuard)
  @Put('status/dev')
  @ApiOkResponse({
    type: DefaultResponse
  })
  async updateDevStatus(
    @Body() status: DevStatuses,
    @CurrentUser() user: User,
    @Res() res: Response
  ) {
    const response = await this.usersService.updateDevStatus(user.id, status)

    return res.status(200).json(response)
  }
}
