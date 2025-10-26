import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'system_configs',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export class SystemConfig extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  key: string;

  @Column({
    type: DataType.TEXT
  })
  value: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  description: string;

  @Column({
    field: 'is_public',
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  isPublic: boolean;

  @Column({
    field: 'created_at',
    type: DataType.DATE
  })
  createdAt: Date;

  @Column({
    field: 'updated_at',
    type: DataType.DATE
  })
  updatedAt: Date;
}