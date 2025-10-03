import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { User } from 'src/modules/users/entities/user.entity';
import { Role } from 'src/common/entities/role.entity';
import { Language } from 'src/common/entities/language.entity';
import { UserLanguage } from 'src/common/entities/user-language.entity';

dotenv.config();

export const db = new Sequelize({
  dialect: 'postgres',
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  models: [User, Role, Language, UserLanguage],
  define: {
    underscored: true,
  },
  logging: false,
});
