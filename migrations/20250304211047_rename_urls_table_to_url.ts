import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw('ALTER TABLE urls RENAME TO url');
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.raw('ALTER TABLE url RENAME TO urls');
}
