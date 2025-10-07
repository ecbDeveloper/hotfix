import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('accepts_reviews', table => {
    table.uuid('dev_id')
    table.uuid("review_id")
    table.boolean('in_progress').defaultTo(true)

    table.foreign('dev_id').references('users.id');
    table.foreign('review_id').references('review_requests.id');
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('accepts_reviews')
}

