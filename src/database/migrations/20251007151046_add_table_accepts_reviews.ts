import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('accepts_reviews', table => {
    table.uuid('dev_id').notNullable()
    table.uuid("review_id").notNullable()
    table.integer('status_id').notNullable().defaultTo(1)
    table.timestamps(true, true);

    table.primary(['dev_id', 'review_id'])

    table.foreign('dev_id').references('users.id');
    table.foreign('review_id').references('review_requests.id');
    table.foreign('status_id').references('accept_review_statuses.id');
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('accepts_reviews')
}

