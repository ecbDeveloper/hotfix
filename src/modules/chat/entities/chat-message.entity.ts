import { Optional } from 'sequelize';
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  Default,
} from 'sequelize-typescript';
import { User } from 'src/modules/users/entities/user.entity';
import { ChatRoom } from './chat-room.entity';

interface ChatMessageAttributes {
  id: string;
  roomId: string;
  userId: string;
  content: string;
  edited: boolean;
}

type ChatMessageCreationAttributes = Optional<ChatMessageAttributes, 'id' | 'edited'>

@Table({
  tableName: 'chat_messages',
  timestamps: true,
})
export class ChatMessage extends Model<ChatMessageAttributes, ChatMessageCreationAttributes> {
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  declare id: string;

  @ForeignKey(() => ChatRoom)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  roomId: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  edited: boolean;

  @BelongsTo(() => ChatRoom)
  room: ChatRoom;

  @BelongsTo(() => User)
  user: User;
}