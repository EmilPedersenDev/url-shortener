import knex from 'knex';
import knexConfiguration from '../../../../knexfile';

export const knexClient: knex.Knex<never, []> = knex(knexConfiguration[process.env.NODE_ENV ?? 'development']);
