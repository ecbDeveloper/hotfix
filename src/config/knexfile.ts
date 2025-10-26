import type { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      database: 'hotfix_db',
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'neeko0505',
    },
    migrations: {
      extension: 'ts',
      directory: '../database/migrations/',
    },
  },
};

export default config;
