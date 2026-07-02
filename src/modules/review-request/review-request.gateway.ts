import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io'
import { UsersService } from "../users/users.service";
import { forwardRef, Inject } from "@nestjs/common";

@WebSocketGateway({
  cors: { origin: '*' }
})
export class ReviewRequestGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) { }

  @WebSocketServer()
  server: Server

  private connectedUsers = new Map<string, string>();

  async handleConnection(socketClient: Socket) {
    const userId = socketClient.handshake.query.userId as string;

    if (userId) {
      const user = await this.usersService.findOneById(userId)
      if (!user) {
        console.log('User not found')
        return
      }

      this.connectedUsers.set(userId, socketClient.id);
      console.log(`Client connected: ${socketClient.id} | User: ${userId}`);
    } else {
      console.log(`Client disconnected: ${socketClient.id} (No userId provided)`);
    }
  }

  async handleDisconnect(socketClient: Socket) {
    for (const [userId, socketId] of this.connectedUsers.entries()) {
      if (socketId === socketClient.id) {
        this.connectedUsers.delete(userId)
        await socketClient.leave('work-room')

        console.log(`Socket client with id - ${userId} desconnected from room successfully`)
        break
      }
    }
  }

  async addToSomeRoom(userId: string, room: string) {
    const socketId = this.connectedUsers.get(userId)
    if (!socketId) {
      console.log('User not found on connectedUsers')
      return
    }

    const socketClient = this.server.sockets.sockets.get(socketId)
    if (socketClient) {
      await socketClient.join(room)
      console.log(`Socket client with id - ${userId} connected to room successfully`)
    }
  }

  async removeFromSomeRoom(userId: string, room: string) {
    const socketId = this.connectedUsers.get(userId);
    if (!socketId) {
      console.log('User not found on connectedUsers')
      return
    }

    const socketClient = this.server.sockets.sockets.get(socketId);
    if (socketClient) {
      await socketClient.leave(room);
      socketClient.disconnect(true)
      this.connectedUsers.delete(userId);
      console.log(`Socket client with id - ${userId} disconnected from room successfully`)
    }
  }

  broadcastToRoom(room: string, event: string, payload: any) {
    this.server.to(room).emit(event, payload);
  }

  handlePrivateMessage(toUserId: string, event: string, payload: any) {
    const socketId = this.connectedUsers.get(toUserId);
    if (socketId) {
      this.server.to(socketId).emit(event, payload);
    } else {
      console.log(`User ${toUserId} isn't connected`);
    }
  }
}
