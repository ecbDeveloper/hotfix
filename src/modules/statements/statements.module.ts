import { Module } from '@nestjs/common';
import { StatementsService } from './statements.service';
import { StatementsController } from './statements.controller';
import { StatementsRepository } from './statements.repository';

@Module({
  controllers: [StatementsController],
  providers: [StatementsService, StatementsRepository],
  exports: [StatementsService],
})
export class StatementsModule {}