import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('review_request', (table) => {
    table.uuid('id').primary();
    table.float('price').notNullable();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.string('code_snippet').notNullable();
    table.integer('status').notNullable().unsigned();
    table.integer('language').notNullable().unsigned();
    table.timestamps(true, true);

    table.foreign('language').references('languages.id')
    table.foreign('status').references('review_statuses.id')
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('review_request')
}

