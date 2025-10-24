import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Statement } from '../../common/entities/statement.entity';
import { CreateStatementDto } from './dto/create-statement.dto';
import { UpdateStatementDto } from './dto/update-statement.dto';
import { StatementNotificationsService } from './statement-notifications.service';

@Injectable()
export class StatementsService {
  constructor(
    @InjectModel(Statement)
    private readonly statement: typeof Statement,
    private readonly notificationsService: StatementNotificationsService,
  ) {}

  async create(createStatementDto: CreateStatementDto) {
    const statement = await this.statement.create(createStatementDto as any);

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
    return this.statement.findAll({
      where: userId ? { userId } : {},
      order: [['createdAt', 'DESC']]
    });
  }

  async findOne(id: string) {
    const statement = await this.statement.findByPk(id);
    if (!statement) {
      throw new NotFoundException(`Statement with ID ${id} not found`);
    }
    return statement;
  }

  async update(id: string, updateStatementDto: UpdateStatementDto) {
    const statement = await this.findOne(id);
    await statement.update(updateStatementDto);
    
    await this.notificationsService.notifyStatementUpdated(
      statement.userId,
      {
        id: statement.id,
        amount: statement.amount,
        type: statement.type
      }
    );

    return statement;
  }

  async remove(id: string) {
    const statement = await this.findOne(id);
    await statement.destroy();

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
    const statement = await this.findOne(id);
    await statement.destroy();
  }

  async getUserBalance(userId: string) {
    const statements = await this.statement.findAll({
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