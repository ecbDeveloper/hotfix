import { Optional } from 'sequelize';
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
import { Solution } from 'src/modules/solution/entities/solution.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export interface SolutionCommentAttributes {
  id: string;
  solutionId: string;
  userId: string;
  content: string;
  isEdited: boolean;
}

type SolutionCommentAttributesCreation = Optional<SolutionCommentAttributes, 'id'>

@Table({
  tableName: 'solution_comments',
  timestamps: true,
})
export class SolutionComment extends Model<SolutionCommentAttributes, SolutionCommentAttributesCreation> {
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
