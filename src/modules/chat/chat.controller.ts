import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ChatService } from './chat.service';
import { CreateChatRoomDto, CreateChatMessageDto, UpdateChatMessageDto } from './dto/chat.dto';
import { User } from '../users/entities/user.entity';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { ChatRoom } from './entities/chat-room.entity';
import { ChatMessage } from './entities/chat-message.entity';
import { PaginatedDto } from 'src/common/dto/paginated-response.dto';

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('room')
  async createRoom(
    @Body() createRoomDto: CreateChatRoomDto,
    @GetUser() user: User
  ): Promise<ChatRoom> {
    return await this.chatService.createRoom(createRoomDto, user.id);
  }

  @Get('rooms')
  async getRooms(@GetUser() user: User): Promise<ChatRoom[]> {
    return await this.chatService.getRooms(user.id);
  }

  @Get('room/:roomId/messages')
  async getMessages(
    @Param('roomId') roomId: string,
    @GetUser() user: User,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number
  ): Promise<PaginatedDto<ChatMessage>> {
    return await this.chatService.getMessages(roomId, user.id, limit, offset);
  }

  @Post('room/:roomId/message')
  async createMessage(
    @Param('roomId') roomId: string,
    @Body() createMessageDto: CreateChatMessageDto,
    @GetUser() user: User
  ): Promise<ChatMessage> {
    return await this.chatService.createMessage(roomId, user.id, createMessageDto);
  }

  @Put('message/:messageId')
  async updateMessage(
    @Param('messageId') messageId: string,
    @Body() updateMessageDto: UpdateChatMessageDto,
    @GetUser() user: User
  ): Promise<ChatMessage> {
    return await this.chatService.updateMessage(messageId, user.id, updateMessageDto);
  }

  @Delete('message/:messageId')
  async deleteMessage(
    @Param('messageId') messageId: string,
    @GetUser() user: User
  ): Promise<void> {
    await this.chatService.deleteMessage(messageId, user.id);
  }
}