import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('solution_comments', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('solution_id').notNullable();
    table.uuid('user_id').notNullable();
    table.text('content').notNullable();
    table.boolean('is_edited').notNullable().defaultTo(false);
    table.timestamps(true, true);

    table.foreign('solution_id').references('solutions.id').onDelete('CASCADE');
    table.foreign('user_id').references('users.id').onDelete('CASCADE');
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('solution_comments')
}

