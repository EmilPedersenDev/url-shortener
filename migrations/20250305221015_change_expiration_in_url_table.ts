import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw('ALTER TABLE url ALTER COLUMN expiration DROP NOT NULL');
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.raw('ALTER TABLE url ALTER COLUMN expiration SET NOT NULL');
}
