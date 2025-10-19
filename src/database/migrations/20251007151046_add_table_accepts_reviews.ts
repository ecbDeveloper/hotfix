import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('accepts_reviews', table => {
    table.uuid('id').primary()
    table.integer('status_id').notNullable().defaultTo(1)
    table.timestamps(true, true);

    table.foreign('status_id').references('accept_review_statuses.id');
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('accepts_reviews')
}

