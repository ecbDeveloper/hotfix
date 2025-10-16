import { Injectable, NotFoundException } from '@nestjs/common';
import { StatementsRepository } from './statements.repository';
import { CreateStatementDto } from './dto/create-statement.dto';
import { UpdateStatementDto } from './dto/update-statement.dto';

@Injectable()
export class StatementsService {
  constructor(private readonly statementsRepository: StatementsRepository) {}

  async create(createStatementDto: CreateStatementDto) {
    return this.statementsRepository.create(createStatementDto);
  }

  async findAll(userId?: string) {
    return this.statementsRepository.findAll(userId);
  }

  async findOne(id: string) {
    const statement = await this.statementsRepository.findOne(id);
    if (!statement) {
      throw new NotFoundException(`Statement with ID ${id} not found`);
    }
    return statement;
  }

  async update(id: string, updateStatementDto: UpdateStatementDto) {
    await this.findOne(id); // Ensure exists
    return this.statementsRepository.update(id, updateStatementDto);
  }

  async delete(id: string) {
    await this.findOne(id); // Ensure exists
    await this.statementsRepository.delete(id);
  }

  async getUserBalance(userId: string) {
    const statements = await this.statementsRepository.findAll(userId);
    
    return statements.reduce((balance, statement) => {
      const amount = Number(statement.amount);
      return statement.type === 'credit'
        ? balance + amount
        : balance - amount;
    }, 0);
  }
}