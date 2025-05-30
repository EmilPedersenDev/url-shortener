import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw('ALTER TABLE url DROP COLUMN expiration');
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.raw('ALTER TABLE url ADD COLUMN expiration TIMESTAMPTZ NOT NULL');
}
