import { Optional } from 'sequelize';
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  Default,
} from 'sequelize-typescript';
import { ReviewRequest } from '../../../modules/review-request/entities/review-request.entity';
import { User } from '../../../modules/users/entities/user.entity';
import { ChatMessage } from './chat-message.entity.js';

interface ChatRoomAttributes {
  id: string;
  reviewId: string;
  devId: string;
  clientId: string;
}

type ChatRoomCreationAttributes = Optional<ChatRoomAttributes, 'id'>

@Table({
  tableName: 'chat_rooms',
  timestamps: true,
})
export class ChatRoom extends Model<ChatRoomAttributes, ChatRoomCreationAttributes> {
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  declare id: string;

  @ForeignKey(() => ReviewRequest)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  reviewId: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  devId: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  clientId: string;

  @BelongsTo(() => ReviewRequest)
  reviewRequest: ReviewRequest;

  @BelongsTo(() => User, 'devId')
  dev: User;

  @BelongsTo(() => User, 'clientId')
  client: User;

  @HasMany(() => ChatMessage)
  messages: ChatMessage[];
}