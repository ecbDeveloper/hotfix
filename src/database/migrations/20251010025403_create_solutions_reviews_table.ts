import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('solution-reviews', (table) => {
    table.uuid('id').primary()
    table.uuid('review_id').notNullable()
    table.uuid('dev_id').notNullable()
    table.text('solution').notNullable()
    table.boolean('accepted_solution').defaultTo(false)
    table.timestamps(true, true);

    table.foreign('review_id').references('review_requests.id');
    table.foreign('dev_id').references('users.id');
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('solution-reviews')
}

