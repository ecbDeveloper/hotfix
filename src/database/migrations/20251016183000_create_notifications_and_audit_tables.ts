import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Create notification type enum
  await knex.raw(`CREATE TYPE notification_type AS ENUM (
    'balance_changed',
    'transaction_completed',
    'system_config_changed',
    'review_request',
    'solution_submitted',
    'statement_created',
    'statement_updated',
    'statement_deleted'
  )`);

  // Create notifications table
  await knex.schema.createTable('notifications', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.specificType('type', 'notification_type').notNullable();
    table.string('title').notNullable();
    table.text('message').notNullable();
    table.boolean('read').defaultTo(false);
    table.jsonb('metadata');
    table.timestamps(true, true);

    // Indexes
    table.index('user_id');
    table.index('type');
    table.index('read');
  });

  // Create statement audit logs table
  // Create audit action enum type
  await knex.raw(`CREATE TYPE audit_action AS ENUM ('create', 'update', 'delete')`);

  await knex.schema.createTable('statement_audit_logs', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('statement_id').references('id').inTable('statements').onDelete('CASCADE');
    table.uuid('user_id').references('id').inTable('users').onDelete('SET NULL');
    table.specificType('action', 'audit_action').notNullable();
    table.jsonb('old_data');
    table.jsonb('new_data');
    table.text('reason');
    table.timestamp('created_at').defaultTo(knex.fn.now());

    // Indexes
    table.index('statement_id');
    table.index('user_id');
    table.index('action');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('statement_audit_logs');
  await knex.schema.dropTableIfExists('notifications');
  await knex.raw('DROP TYPE IF EXISTS audit_action');
  await knex.raw('DROP TYPE IF EXISTS notification_type');
}