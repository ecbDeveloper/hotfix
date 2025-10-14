import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('solution_comments', (table) => {
    table.uuid('id').primary()
    table.uuid('solution_id').notNullable()
    table.text('comment').notNullable()

    table.foreign('solution_id').references('solutions.id')
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('solution_comments')
}

