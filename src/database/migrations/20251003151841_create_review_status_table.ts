import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('review_statuses', (table) => {
    table.increments('id').primary();
    table.string('description').notNullable().unique();
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('review_statuses')
}

