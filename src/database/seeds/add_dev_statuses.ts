import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex('dev_statuses').del();

  await knex('dev_statuses').insert([
    { description: 'Taking a break' },
    { description: 'Working' },
    { description: 'On review' },
  ]);
};
