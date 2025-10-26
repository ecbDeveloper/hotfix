import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Table({
  tableName: 'user_comments',
  timestamps: true,
})
export class UserComment extends Model {
  @ApiProperty({ description: 'ID único do comentário' })
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ApiProperty({ description: 'ID do usuário que fez o comentário' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'user_id',
  })
  userId: string;

  @ApiProperty({ description: 'ID do usuário que recebeu o comentário' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'target_user_id',
  })
  targetUserId: string;

  @ApiProperty({ description: 'Conteúdo do comentário' })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string;

  @ApiProperty({ description: 'O comentário foi editado?' })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isEdited: boolean;

  @ApiProperty({ description: 'Data de criação do comentário' })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  createdAt: Date;

  @ApiProperty({ description: 'Data da última atualização do comentário' })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  updatedAt: Date;

  @BelongsTo(() => User, 'userId')
  user: User;

  @BelongsTo(() => User, 'targetUserId')
  targetUser: User;
}