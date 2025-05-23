import { knexClient } from '../../src/server/common/config/database-client';
import { urlSeedData } from '../seeds';

export function setupDatabaseForUrlTests() {
  before(async () => {
    // Truncate the events table before running the test to ensure fresh data
    try {
      console.log('Truncate the events table to ensure fresh data before running the tests');
      await knexClient.raw(`TRUNCATE TABLE ${process.env.DATABASE_TABLE_NAME}`);
      console.log('Truncated the events table successfully!');
      console.log('Seed data to the database');
      await knexClient(`${process.env.DATABASE_TABLE_NAME}`).insert(urlSeedData as never);
    } catch (err) {
      console.error('Error when preparing the database for the tests', err);
      throw err;
    }
  });
}
