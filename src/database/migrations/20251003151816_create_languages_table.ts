import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('languages', (table) => {
    table.increments('id').primary();
    table.string('description').notNullable().unique();
  });

  await knex('languages').insert([
    { description: 'JavaScript' },
    { description: 'TypeScript' },
    { description: 'Python' },
    { description: 'Java' },
    { description: 'C#' },
    { description: 'C' },
    { description: 'C++' },
    { description: 'Go' },
    { description: 'Rust' },
    { description: 'PHP' },
    { description: 'Ruby' },
    { description: 'Kotlin' },
    { description: 'Swift' },
    { description: 'Dart' },
    { description: 'Scala' },
    { description: 'R' },
  ]);
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('languages')
}

