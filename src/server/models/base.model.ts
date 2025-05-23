import { knexClient } from '../common/config/database-client';
import { SqlQueryResponse } from '../types/url.types';
import { NotFoundError } from '../common/errors';

class BaseModel {
  protected readonly databaseName: string;
  protected readonly databaseTableName: string;
  constructor() {
    this.databaseName = process.env.DATABASE_NAME as string;
    this.databaseTableName = process.env.DATABASE_TABLE_NAME as string;
  }

  protected async executeMultipleRowQuery<T>(sqlQuery: string, sqlParams: object): Promise<Array<T>> {
    const response: SqlQueryResponse<T> = await knexClient.raw(sqlQuery, sqlParams);

    if (!Array.isArray(response?.rows)) {
      throw new NotFoundError('No rows property from the database');
    }
    return response.rows;
  }

  protected async executeSingleRowQuery<T>(sqlQuery: string, sqlParams: object): Promise<T> {
    const response: SqlQueryResponse<T> = await knexClient.raw(sqlQuery, sqlParams);

    if (!Array.isArray(response?.rows)) {
      throw new NotFoundError('No rows property from the database.');
    }
    return response.rows[0];
  }
}

export default BaseModel;
