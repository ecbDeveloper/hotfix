import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex('review_statuses').del();

  await knex('review_statuses').insert([
    { description: 'Open' },
    { description: 'In Progress' },
    { description: 'Done' },
    { description: 'Cancelled' },
  ]);
};
