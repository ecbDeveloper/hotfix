import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('review_requests', (table) => {
    table.uuid('id').primary();
    table.uuid('user_id').notNullable()
    table.float('price').notNullable();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.string('code_snippet').notNullable();
    table.integer('status').notNullable().unsigned().defaultTo(1);
    table.integer('language').notNullable().unsigned();
    table.integer('payment_method').notNullable().unsigned();
    table.timestamps(true, true);

    table.foreign('language').references('languages.id');
    table.foreign('status').references('review_statuses.id');
    table.foreign('user_id').references('users.id');
    table.foreign('payment_method').references('payment_methods.id');
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('review_requests')
}

