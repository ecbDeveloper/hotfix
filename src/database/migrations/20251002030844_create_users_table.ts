import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.uuid('id').primary();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.integer('role_id').notNullable().unsigned();
    table.boolean('active').notNullable().defaultTo(true);
    table.integer('dev_status_id').unsigned()
    table.timestamps(true, true);

    table.foreign('role_id').references('roles.id')
    table.foreign('dev_status_id').references('dev_statuses.id')
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('users');
}
