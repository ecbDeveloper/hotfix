import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { Notification } from '../../common/entities/notification.entity';
import { CreateNotificationDto, UpdateNotificationDto } from './dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
  ) {}

  async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const notification = this.notificationsRepository.create(createNotificationDto);
    return await this.notificationsRepository.save(notification);
  }

  async findAllForUser(userId: string, paginationQuery: PaginationQueryDto): Promise<[Notification[], number]> {
    const { page = 1, limit = 10 } = paginationQuery;
    const skip = (page - 1) * limit;

    const [notifications, total] = await this.notificationsRepository.findAndCount({
      where: { userId },
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });

    return [notifications, total];
  }

  async findUnreadForUser(userId: string, paginationQuery: PaginationQueryDto): Promise<[Notification[], number]> {
    const { page = 1, limit = 10 } = paginationQuery;
    const skip = (page - 1) * limit;

    const [notifications, total] = await this.notificationsRepository.findAndCount({
      where: { userId, read: false },
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });

    return [notifications, total];
  }

  async findOne(id: string): Promise<Notification> {
    const notification = await this.notificationsRepository.findOne({ where: { id } });
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }
    return notification;
  }

  async markAsRead(id: string): Promise<void> {
    await this.notificationsRepository.update(id, { read: true });
  }

  async markAllAsRead(userId: string): Promise<void> {
    await this.notificationsRepository.update(
      { userId, read: false },
      { read: true }
    );
  }

  async update(id: string, updateNotificationDto: UpdateNotificationDto): Promise<void> {
    const notification = await this.notificationsRepository.findOne({ where: { id } });
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }
    await this.notificationsRepository.update(id, updateNotificationDto);
  }

  async remove(id: string): Promise<void> {
    const notification = await this.notificationsRepository.findOne({ where: { id } });
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }
    await this.notificationsRepository.delete(id);
  }
}