import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users_languages', table => {
    table.uuid('user_id')
    table.integer('language').unsigned();

    table.primary(['user_id', 'language'])

    table.foreign('user_id').references('users.id');
    table.foreign('language').references('languages.id');
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('users_languages');
}

