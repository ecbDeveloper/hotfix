import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex('accept_review_statuses').del();

  await knex('accept_review_statuses').insert([
    { description: 'Pending' },
    { description: 'Accepted' },
    { description: 'Rejected' },
    { description: 'Completed' },
  ]);

};
