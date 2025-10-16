import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Statement } from '../../common/entities/statement.entity';
import { CreateStatementDto } from './dto/create-statement.dto';
import { UpdateStatementDto } from './dto/update-statement.dto';
import { StatementNotificationsService } from './statement-notifications.service';

@Injectable()
export class StatementsService {
  constructor(
    @InjectRepository(Statement)
    private readonly statementsRepository: Repository<Statement>,
    private readonly notificationsService: StatementNotificationsService,
  ) {}

  async create(createStatementDto: CreateStatementDto) {
    const statement = this.statementsRepository.create(createStatementDto);
    await this.statementsRepository.save(statement);

    await this.notificationsService.notifyStatementCreated(
      statement.userId,
      {
        id: statement.id,
        amount: statement.amount,
        type: statement.type
      }
    );

    return statement;
  }

  async findAll(userId?: string) {
    return this.statementsRepository.find({
      where: userId ? { userId } : {},
      order: { createdAt: 'DESC' }
    });
  }

  async findOne(id: string) {
    const statement = await this.statementsRepository.findOne({
      where: { id }
    });
    if (!statement) {
      throw new NotFoundException(`Statement with ID ${id} not found`);
    }
    return statement;
  }

  async update(id: string, updateStatementDto: UpdateStatementDto) {
    const statement = await this.findOne(id);
    await this.statementsRepository.update(id, updateStatementDto);
    
    await this.notificationsService.notifyStatementUpdated(
      statement.userId,
      {
        id: statement.id,
        amount: statement.amount,
        type: statement.type
      }
    );

    return this.findOne(id);
  }

  async remove(id: string) {
    const statement = await this.findOne(id);
    await this.statementsRepository.remove(statement);

    await this.notificationsService.notifyStatementDeleted(
      statement.userId,
      {
        id: statement.id,
        amount: statement.amount,
        type: statement.type
      }
    );
  }

  async delete(id: string) {
    await this.findOne(id);
    await this.statementsRepository.delete(id);
  }

  async getUserBalance(userId: string) {
    const statements = await this.statementsRepository.find({
      where: { userId }
    });
    
    return statements.reduce((balance, statement) => {
      const amount = Number(statement.amount);
      return statement.type === 'credit'
        ? balance + amount
        : balance - amount;
    }, 0);
  }
}