import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex('payment_methods').del();

  await knex('payment_methods').insert([
    { description: 'Pix' },
    { description: 'Credit Card' },
  ]);
};
