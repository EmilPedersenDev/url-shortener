import knex from 'knex';
import knexConfiguration from '../../../../knexfile';

console.log('sdfsdfs', knexConfiguration, process.env.DATABASE_PASSWORD);

export const knexClient: knex.Knex<never, []> = knex(knexConfiguration[process.env.NODE_ENV ?? 'development']);
