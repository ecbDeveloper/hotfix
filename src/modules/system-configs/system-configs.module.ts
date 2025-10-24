import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SystemConfigsService } from './system-configs.service';
import { SystemConfigsController } from './system-configs.controller';
import { SystemConfig } from '../../common/entities/system-config.entity';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    SequelizeModule.forFeature([SystemConfig]),
    CacheModule.registerAsync({
      useFactory: () => ({
        ttl: 300000, // 5 minutes in milliseconds
        max: 100, // maximum number of items in cache
        isGlobal: true,
      }),
    }),
    ConfigModule,
  ],
  controllers: [SystemConfigsController],
  providers: [SystemConfigsService],
  exports: [SystemConfigsService],
})
export class SystemConfigsModule {}