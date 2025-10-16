import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatementsService } from './statements.service';
import { StatementsController } from './statements.controller';
import { Statement } from '../../common/entities/statement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Statement])],
  controllers: [StatementsController],
  providers: [StatementsService],
  exports: [StatementsService],
})
export class StatementsModule {}