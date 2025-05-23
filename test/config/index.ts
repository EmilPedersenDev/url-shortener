import { knexClient } from '../../src/server/common/config/database-client';
import { urlSeedData } from '../seeds';

export function setupDatabaseForUrlTests() {
  before(async () => {
    // Truncate the events table before running the test to ensure fresh data
    try {
      console.log('Truncate the events table to ensure fresh data before running the tests');
      console.log('name: ', process.env.DATABASE_NAME, 'table: ', process.env.DATABASE_TABLE_NAME, 'password: ', process.env.DATABASE_PASSWORD, 'dbuser: ', process.env.DATABASE_USER, 'db host: ', process.env.DATABASE_HOST, "db port: ", process.env.DATABASE_PORT);
      await knexClient.raw(`TRUNCATE TABLE ${process.env.DATABASE_TABLE_NAME}`);
      console.log('Truncated the events table successfully!');
      console.log('Seed data to the database');
      await knexClient(`${process.env.DATABASE_TABLE_NAME}`).insert(urlSeedData as never);
    } catch (err) {
      console.error('Error when preparing the database for the tests', err);
      throw err;
    }
  });

  after(async () => {
    console.log('Destroying knex connection pool...');
    await knexClient.destroy();
    console.log('Destroyed');
  });
}
