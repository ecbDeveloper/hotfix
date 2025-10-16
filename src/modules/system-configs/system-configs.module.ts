import { Module } from '@nestjs/common';
import { SystemConfigsService } from './system-configs.service';
import { SystemConfigsController } from './system-configs.controller';
import { SystemConfigsRepository } from './system-configs.repository';

@Module({
  controllers: [SystemConfigsController],
  providers: [SystemConfigsService, SystemConfigsRepository],
  exports: [SystemConfigsService],
})
export class SystemConfigsModule {}