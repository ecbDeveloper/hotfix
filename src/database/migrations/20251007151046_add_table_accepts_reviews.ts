import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('accepts_reviews', table => {
    table.uuid('id').primary();
    table.integer('status_id').notNullable().defaultTo(1);
    table.uuid('dev_id').notNullable();
    table.uuid('review_id').notNullable();
    table.timestamps(true, true);

    table.foreign('status_id')
      .references('accept_review_statuses.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.foreign('dev_id')
      .references('users.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.foreign('review_id')
      .references('review_requests.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('accepts_reviews');
}

