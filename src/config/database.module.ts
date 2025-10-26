import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService, databaseProviders } from './database.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [...databaseProviders],
  exports: [DatabaseService],
})
export class DatabaseModule {}