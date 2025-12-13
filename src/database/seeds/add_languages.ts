import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex('languages').del();

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
};
