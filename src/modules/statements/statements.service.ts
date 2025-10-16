import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Statement } from '../../common/entities/statement.entity';
import { CreateStatementDto } from './dto/create-statement.dto';
import { UpdateStatementDto } from './dto/update-statement.dto';

@Injectable()
export class StatementsService {
  constructor(
    @InjectRepository(Statement)
    private readonly statementsRepository: Repository<Statement>,
  ) {}

  async create(createStatementDto: CreateStatementDto) {
    return this.statementsRepository.create(createStatementDto);
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
    await this.findOne(id);
    await this.statementsRepository.update(id, updateStatementDto);
    return this.findOne(id);
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