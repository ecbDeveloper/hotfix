import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../config/database.service';
import { SystemConfig } from '../../common/entities/system-config.entity';

@Injectable()
export class SystemConfigsRepository {
  constructor(private readonly db: DatabaseService) {}

  async findAll() {
    return this.db
      .knex('system_configs')
      .select('*')
      .orderBy('id');
  }

  async findOne(id: number) {
    return this.db
      .knex('system_configs')
      .select('*')
      .where('id', id)
      .first();
  }

  async findByKey(key: string) {
    return this.db
      .knex('system_configs')
      .select('*')
      .where('key', key)
      .first();
  }

  async create(data: Partial<SystemConfig>) {
    const [config] = await this.db
      .knex('system_configs')
      .insert({
        key: data.key,
        value: data.value,
        description: data.description,
        is_public: data.isPublic,
      })
      .returning('*');

    return config;
  }

  async update(id: number, data: Partial<SystemConfig>) {
    const [config] = await this.db
      .knex('system_configs')
      .where('id', id)
      .update({
        value: data.value,
        description: data.description,
        is_public: data.isPublic,
      })
      .returning('*');

    return config;
  }

  async delete(id: number) {
    await this.db
      .knex('system_configs')
      .where('id', id)
      .delete();
  }
}