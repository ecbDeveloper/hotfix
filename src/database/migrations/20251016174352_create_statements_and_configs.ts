import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // Enable uuid-ossp extension for uuid_generate_v4()
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  // Create system configurations table
  await knex.schema.createTable('system_configs', (table) => {
    table.increments('id').primary();
    table.string('key').notNullable().unique();
    table.text('value').notNullable();
    table.text('description');
    table.boolean('is_public').defaultTo(false);
    table.timestamps(true, true);
  });

  // Create statements table
  await knex.schema.createTable('statements', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.decimal('amount', 10, 2).notNullable();
    table.string('type').notNullable(); // 'credit' or 'debit'
    table.string('status').notNullable(); // 'pending', 'completed', 'failed', 'cancelled'
    table.string('description').notNullable();
    table.uuid('reference_id'); // ID of the related transaction (review request, solution etc)
    table.string('reference_type'); // Type of the reference (review_request, solution etc)
    table.jsonb('metadata'); // Additional transaction data
    table.timestamps(true, true);

    // Indexes
    table.index('user_id');
    table.index('type');
    table.index('status');
    table.index(['reference_id', 'reference_type']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('statements');
  await knex.schema.dropTableIfExists('system_configs');
}
