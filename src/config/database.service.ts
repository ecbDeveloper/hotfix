import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { ConfigService } from '@nestjs/config';
import knexfile from './knexfile';

@Injectable()
export class DatabaseService {
  private readonly knexInstance: Knex;

  constructor(private configService: ConfigService) {
    const environment = this.configService.get('NODE_ENV') || 'development';
    this.knexInstance = require('knex')(knexfile[environment]);
  }

  get knex(): Knex {
    return this.knexInstance;
  }
}

export const databaseProviders = [
  {
    provide: DatabaseService,
    useFactory: (configService: ConfigService) => {
      return new DatabaseService(configService);
    },
    inject: [ConfigService],
  },
];