import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('url_hash', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()')); // UUID primary key
        table.string('hash').notNullable();  // Hash column

        table.index('hash')
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('url_hash');
}

