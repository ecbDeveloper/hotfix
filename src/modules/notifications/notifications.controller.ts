import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards, 
  ForbiddenException,
  Query,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiPaginatedResponse } from '../../common/decorators/paginated-response.decorator';
import { PaginationQueryDto, DefaultResponse } from '../../common/dto';
import { Notification } from '../../common/entities/notification.entity';

@ApiTags('notifications')
@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new notification' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Notification })
  async create(
    @Body() createNotificationDto: CreateNotificationDto,
    @GetUser() user: User,
  ): Promise<Notification> {
    createNotificationDto.userId = user.id;
    return this.notificationsService.create(createNotificationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all notifications for the current user' })
  @ApiPaginatedResponse(Notification)
  async findAll(
    @GetUser() user: User,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    return this.notificationsService.findAllForUser(user.id, paginationQuery);
  }

  @Get('unread')
  @ApiOperation({ summary: 'Get all unread notifications for the current user' })
  @ApiPaginatedResponse(Notification)
  async findUnread(
    @GetUser() user: User,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    return this.notificationsService.findUnreadForUser(user.id, paginationQuery);
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark a notification as read' })
  @ApiResponse({ status: HttpStatus.OK, type: DefaultResponse })
  @HttpCode(HttpStatus.OK)
  async markAsRead(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ): Promise<DefaultResponse> {
    const notification = await this.notificationsService.findOne(id);
    if (notification.userId !== user.id) {
      throw new ForbiddenException('You do not have permission to access this notification');
    }
    await this.notificationsService.markAsRead(id);
    return { message: 'Notification marked as read', id };
  }

  @Patch('mark-all-read')
  @ApiOperation({ summary: 'Mark all notifications as read' })
  @ApiResponse({ status: HttpStatus.OK, type: DefaultResponse })
  @HttpCode(HttpStatus.OK)
  async markAllAsRead(@GetUser() user: User): Promise<DefaultResponse> {
    await this.notificationsService.markAllAsRead(user.id);
    return { message: 'All notifications marked as read', id: user.id };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a notification' })
  @ApiResponse({ status: HttpStatus.OK, type: DefaultResponse })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateNotificationDto: UpdateNotificationDto,
    @GetUser() user: User,
  ): Promise<DefaultResponse> {
    const notification = await this.notificationsService.findOne(id);
    if (notification.userId !== user.id) {
      throw new ForbiddenException('You do not have permission to access this notification');
    }
    await this.notificationsService.update(id, updateNotificationDto);
    return { message: 'Notification updated successfully', id };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a notification' })
  @ApiResponse({ status: HttpStatus.OK, type: DefaultResponse })
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ): Promise<DefaultResponse> {
    const notification = await this.notificationsService.findOne(id);
    if (notification.userId !== user.id) {
      throw new ForbiddenException('You do not have permission to access this notification');
    }
    await this.notificationsService.remove(id);
    return { message: 'Notification deleted successfully', id };
  }
}