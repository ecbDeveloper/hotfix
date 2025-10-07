import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex('dev_statuses').insert([
    { description: 'On review' },
  ]);
}


export async function down(knex: Knex): Promise<void> {
  await knex('dev_statuses').where('description', 'On review').del()
}

