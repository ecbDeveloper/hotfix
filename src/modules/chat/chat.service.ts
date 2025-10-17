import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Op } from 'sequelize';
import { ChatMessage } from './entities/chat-message.entity';
import { ChatRoom } from './entities/chat-room.entity';
import { ReviewRequestService } from '../review-request/review-request.service';
import { CreateChatRoomDto, CreateChatMessageDto, UpdateChatMessageDto } from './dto/chat.dto';
import { PaginatedDto } from 'src/common/dto/paginated-response.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class ChatService {
  constructor(
    private readonly reviewRequestService: ReviewRequestService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async createRoom(createChatRoomDto: CreateChatRoomDto, userId: string): Promise<ChatRoom> {
    const review = await this.reviewRequestService.findOneById(createChatRoomDto.reviewId);
    
    if (!review) {
      throw new NotFoundException('Review request not found');
    }

    if (review.userId !== userId && createChatRoomDto.devId !== userId) {
      throw new UnprocessableEntityException('Only the review owner or the assigned dev can create a chat room');
    }

    const existingRoom = await ChatRoom.findOne({
      where: {
        reviewId: createChatRoomDto.reviewId,
        devId: createChatRoomDto.devId,
        clientId: review.userId,
      }
    });

    if (existingRoom) {
      throw new UnprocessableEntityException('Chat room already exists');
    }

    const room = await ChatRoom.create({
      reviewId: createChatRoomDto.reviewId,
      devId: createChatRoomDto.devId,
      clientId: review.userId,
    });

    this.eventEmitter.emit('chat.room.created', room);

    return room;
  }

  async getRooms(userId: string): Promise<ChatRoom[]> {
    return await ChatRoom.findAll({
      where: {
        [Op.or]: [
          { devId: userId },
          { clientId: userId }
        ]
      },
      include: ['dev', 'client', 'reviewRequest']
    });
  }

  async getMessages(roomId: string, userId: string, limit = 50, offset = 0): Promise<PaginatedDto<ChatMessage>> {
    const room = await ChatRoom.findOne({
      where: { id: roomId }
    });

    if (!room) {
      throw new NotFoundException('Chat room not found');
    }

    if (room.devId !== userId && room.clientId !== userId) {
      throw new UnprocessableEntityException('You are not a participant in this chat room');
    }

    const { count, rows } = await ChatMessage.findAndCountAll({
      where: { roomId },
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      include: ['user']
    });

    return {
      results: rows,
      total: count,
      limit,
      offset
    };
  }

  async createMessage(roomId: string, userId: string, createMessageDto: CreateChatMessageDto): Promise<ChatMessage> {
    const room = await ChatRoom.findOne({
      where: { id: roomId }
    });

    if (!room) {
      throw new NotFoundException('Chat room not found');
    }

    if (room.devId !== userId && room.clientId !== userId) {
      throw new UnprocessableEntityException('You are not a participant in this chat room');
    }

    const message = await ChatMessage.create({
      roomId,
      userId,
      content: createMessageDto.content
    });

    this.eventEmitter.emit('chat.message.created', message);

    return message;
  }

  async updateMessage(messageId: string, userId: string, updateMessageDto: UpdateChatMessageDto): Promise<ChatMessage> {
    const message = await ChatMessage.findOne({
      where: { id: messageId }
    });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    if (message.userId !== userId) {
      throw new UnprocessableEntityException('You can only edit your own messages');
    }

    message.content = updateMessageDto.content;
    message.edited = true;
    await message.save();

    this.eventEmitter.emit('chat.message.updated', message);

    return message;
  }

  async deleteMessage(messageId: string, userId: string): Promise<void> {
    const message = await ChatMessage.findOne({
      where: { id: messageId }
    });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    if (message.userId !== userId) {
      throw new UnprocessableEntityException('You can only delete your own messages');
    }

    await message.destroy();
    this.eventEmitter.emit('chat.message.deleted', { messageId, roomId: message.roomId });
  }
}