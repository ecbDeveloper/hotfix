import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('chat_rooms', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('review_id').notNullable();
    table.uuid('dev_id').notNullable();
    table.uuid('client_id').notNullable();
    table.timestamps(true, true);

    table.foreign('review_id').references('review_requests.id').onDelete('CASCADE');
    table.foreign('dev_id').references('users.id').onDelete('CASCADE');
    table.foreign('client_id').references('users.id').onDelete('CASCADE');
  });

  await knex.schema.createTable('chat_messages', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('room_id').notNullable();
    table.uuid('user_id').notNullable();
    table.text('content').notNullable();
    table.boolean('edited').notNullable().defaultTo(false);
    table.timestamps(true, true);

    table.foreign('room_id').references('chat_rooms.id').onDelete('CASCADE');
    table.foreign('user_id').references('users.id').onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('chat_messages');
  await knex.schema.dropTableIfExists('chat_rooms');
}