import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../config/database.service';
import { Statement } from '../../common/entities/statement.entity';

@Injectable()
export class StatementsRepository {
  constructor(private readonly db: DatabaseService) {}

  async findAll(userId?: string) {
    const query = this.db
      .knex('statements')
      .select('*')
      .orderBy('created_at', 'desc');

    if (userId) {
      query.where('user_id', userId);
    }

    return query;
  }

  async findOne(id: string) {
    return this.db
      .knex('statements')
      .select('*')
      .where('id', id)
      .first();
  }

  async create(data: Partial<Statement>) {
    const [statement] = await this.db
      .knex('statements')
      .insert({
        user_id: data.userId,
        amount: data.amount,
        type: data.type,
        status: data.status,
        description: data.description,
        reference_id: data.referenceId,
        reference_type: data.referenceType,
        metadata: data.metadata,
      })
      .returning('*');

    return statement;
  }

  async update(id: string, data: Partial<Statement>) {
    const [statement] = await this.db
      .knex('statements')
      .where('id', id)
      .update({
        status: data.status,
        metadata: data.metadata,
      })
      .returning('*');

    return statement;
  }

  async delete(id: string) {
    await this.db
      .knex('statements')
      .where('id', id)
      .delete();
  }
}