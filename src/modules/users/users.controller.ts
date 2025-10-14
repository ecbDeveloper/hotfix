import { Body, Controller, Delete, Get, Put, Query, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { User } from './entities/user.entity';
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { DefaultResponse } from 'src/common/dto/default-response.dto';
import type { Response } from 'express';
import { UpdateDevStatusDto, UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/response-user.dto';
import { ApiPaginatedResponse } from 'src/common/decorators/paginated-response.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOkResponse({
    type: UserResponseDto
  })
  async getUserFromToken(@CurrentUser() user: User, @Res() res: Response) {
    const response = await this.usersService.findOneById(user.id)

    return res.status(200).json(response)
  }

  @Get()
  @ApiPaginatedResponse(UserResponseDto)
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'offset', required: false, type: Number, example: 0 })
  async findAllUsers(
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
    @Res() res: Response
  ) {
    const users = await this.usersService.findAll(limit, offset)

    return res.status(200).json(users)
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  @ApiOkResponse({
    type: DefaultResponse
  })
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() user: User,
    @Res() res: Response
  ) {
    updateUserDto = {
      ...updateUserDto,
      userId: user.id
    }
    const response = await this.usersService.update(updateUserDto)

    return res.status(200).json(response)
  }

  @UseGuards(JwtAuthGuard)
  @Put('status/dev')
  @ApiOkResponse({
    type: DefaultResponse
  })
  async updateDevStatus(
    @Body() updateDevStatusDto: UpdateDevStatusDto,
    @CurrentUser() user: User,
    @Res() res: Response
  ) {
    const response = await this.usersService.updateDevStatus(user.id, updateDevStatusDto.status)

    return res.status(200).json(response)
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  @ApiOkResponse({
    type: DefaultResponse
  })
  async delete(
    @CurrentUser() user: User,
    @Res() res: Response
  ) {
    const response = await this.usersService.delete(user.id)

    return res.status(200).json(response)
  }
}
