import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ChatRoom } from './entities/chat-room.entity';
import { ChatMessage } from './entities/chat-message.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@UseGuards(JwtAuthGuard)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedClients = new Map<string, Socket>();

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (userId) {
      this.connectedClients.set(userId, client);
      client.join(`user_${userId}`);
    }
  }

  handleDisconnect(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (userId) {
      this.connectedClients.delete(userId);
      client.leave(`user_${userId}`);
    }
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, roomId: string) {
    client.join(`room_${roomId}`);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, roomId: string) {
    client.leave(`room_${roomId}`);
  }

  async handleRoomCreated(room: ChatRoom) {
    this.server.to(`user_${room.devId}`).emit('roomCreated', room);
    this.server.to(`user_${room.clientId}`).emit('roomCreated', room);
  }

  async handleNewMessage(message: ChatMessage) {
    this.server.to(`room_${message.roomId}`).emit('newMessage', message);
  }

  async handleMessageUpdated(message: ChatMessage) {
    this.server.to(`room_${message.roomId}`).emit('messageUpdated', message);
  }

  async handleMessageDeleted(messageId: string, roomId: string) {
    this.server.to(`room_${roomId}`).emit('messageDeleted', messageId);
  }
}