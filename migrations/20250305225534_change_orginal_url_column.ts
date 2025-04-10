import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw('ALTER TABLE url RENAME COLUMN "originalUrl" TO original_url');
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.raw('ALTER TABLE url RENAME COLUMN original_url TO "originalUrl"');
}
