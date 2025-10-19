import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('solutions', (table) => {
    table.uuid('id').primary()
    table.uuid('accept_review_id').notNullable()
    table.text('solution').notNullable()
    table.boolean('accepted_solution').defaultTo(false)
    table.timestamps(true, true);

    table.foreign('accept_review_id').references('accepts_reviews.id');
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('solutions')
}

