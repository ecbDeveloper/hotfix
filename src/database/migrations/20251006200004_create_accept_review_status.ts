import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('accept_review_statuses', (table) => {
    table.increments('id').primary();
    table.string('description').notNullable().unique();
  });

  await knex('accept_review_statuses').insert([
    { description: 'Pending' },
    { description: 'Accepted' },
    { description: 'Rejected' },
    { description: 'Completed' },
  ]);

}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('accept_review_statuses')
}

