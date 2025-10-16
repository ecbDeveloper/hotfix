import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt
} from 'sequelize-typescript';
import { Solution } from '../../solution/entities/solution.entity';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Table({
  tableName: 'solution_comments',
  timestamps: true,
})
export class Comment extends Model<Comment> {
  @ApiProperty({ description: 'ID único do comentário' })
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @ApiProperty({ description: 'ID do usuário que fez o comentário' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'user_id',
  })
  userId: string;

  @ApiProperty({ description: 'ID da solução que está sendo comentada' })
  @ForeignKey(() => Solution)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'solution_id',
  })
  solutionId: string;

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
  @CreatedAt
  createdAt: Date;

  @ApiProperty({ description: 'Data da última atualização do comentário' })
  @UpdatedAt
  updatedAt: Date;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Solution)
  solution: Solution;
}

  @BelongsTo(() => Solution)
  solution: Solution;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  comment: string;
}
