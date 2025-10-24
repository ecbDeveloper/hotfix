import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { Notification } from '../../common/entities/notification.entity';
import { CreateNotificationDto, UpdateNotificationDto } from './dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification)
    private notification: typeof Notification,
  ) {}

  async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    return await this.notification.create(createNotificationDto as any);
  }

  async findAllForUser(userId: string, paginationQuery: PaginationQueryDto): Promise<[Notification[], number]> {
    const { page = 1, limit = 10 } = paginationQuery;
    const offset = (page - 1) * limit;

    const { rows, count } = await this.notification.findAndCountAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      offset,
      limit,
    });

    return [rows, count];
  }

  async findUnreadForUser(userId: string, paginationQuery: PaginationQueryDto): Promise<[Notification[], number]> {
    const { page = 1, limit = 10 } = paginationQuery;
    const offset = (page - 1) * limit;

    const { rows, count } = await this.notification.findAndCountAll({
      where: { userId, read: false },
      order: [['createdAt', 'DESC']],
      offset,
      limit,
    });

    return [rows, count];
  }

  async findOne(id: string): Promise<Notification> {
    const notification = await this.notification.findByPk(id);
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }
    return notification;
  }

  async markAsRead(id: string): Promise<void> {
    const notification = await this.findOne(id);
    await notification.update({ read: true });
  }

  async markAllAsRead(userId: string): Promise<void> {
    await this.notification.update(
      { read: true },
      { where: { userId, read: false } }
    );
  }

  async update(id: string, updateNotificationDto: UpdateNotificationDto): Promise<void> {
    const notification = await this.findOne(id);
    await notification.update(updateNotificationDto);
  }

  async remove(id: string): Promise<void> {
    const notification = await this.findOne(id);
    await notification.destroy();
  }
}