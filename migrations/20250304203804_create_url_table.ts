import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('urls', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()')); // UUID primary key
    table.string('hash').notNullable(); // Hash column
    table.string('originalUrl').notNullable(); // Original URL
    table.timestamp('expiration').notNullable(); // Expiration timestamp

    table.index('hash');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('urls');
}
