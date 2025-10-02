import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';

export const db = new Sequelize({
  dialect: 'postgres',
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  models: [User],
  define: {
    underscored: true,
  },
});
