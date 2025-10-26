import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ReviewRequestModule } from '../review-request/review-request.module';
import { ChatRoom } from './entities/chat-room.entity';
import { ChatMessage } from './entities/chat-message.entity';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { ChatController } from './chat.controller.js';

@Module({
  imports: [
    ReviewRequestModule,
    SequelizeModule.forFeature([ChatRoom, ChatMessage]),
    EventEmitterModule.forRoot()
  ],
  controllers: [ChatController],
  providers: [ChatGateway, ChatService],
  exports: [ChatService]
})
export class ChatModule {}