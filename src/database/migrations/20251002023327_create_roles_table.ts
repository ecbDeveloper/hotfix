
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('roles', (table) => {
    table.increments('id').primary();
    table.string('description').notNullable().unique();
  });

  await knex('roles').insert([
    { id: 1, description: 'Client' },
    { id: 2, description: 'Developer' },
  ]);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('roles');
}

