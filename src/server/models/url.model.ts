import BaseModel from './base.model';
import { OriginalUrlResponse, Url, UrlData } from '../types/url.types';

class UrlModel extends BaseModel {
  private readonly databaseTableName: string;
  constructor() {
    super();
    this.databaseTableName = 'url';
  }

  public async createShortUrl(originalUrl: string, hash: string): Promise<UrlData> {
    const sqlQuery: string = `
      INSERT INTO ${this.databaseTableName}(
        hash,
        original_url,
        expiration
      ) VALUES(
        :hash,
        :originalUrl,
        :expiration
      ) RETURNING *`;
    const sqlQueryParams = {
      hash,
      originalUrl: originalUrl,
      expiration: null,
    };
    return this.executeSingleRowQuery<UrlData>(sqlQuery, sqlQueryParams);
  }

  public async existingUrlHash(hash: string): Promise<{ exists: boolean }> {
    const sqlQuery: string = `
        SELECT EXISTS (
            SELECT 1 FROM ${this.databaseTableName} WHERE hash = :hash
        )
      `;
    const sqlQueryParams = {
      hash,
    };
    return this.executeSingleRowQuery<{ exists: boolean }>(sqlQuery, sqlQueryParams);
  }

  public async existingUrl(url: string): Promise<UrlData> {
    const sqlQuery: string = `
          SELECT * FROM ${this.databaseTableName} WHERE original_url = :url
      `;
    const sqlQueryParams = {
      url,
    };
    return this.executeSingleRowQuery<UrlData>(sqlQuery, sqlQueryParams);
  }

  public async getOriginalUrlByHash(hash: string): Promise<Url> {
    const sqlQuery: string = `
          SELECT hash, original_url as "originalUrl" FROM ${this.databaseTableName} WHERE hash = :hash limit 1
      `;
    const sqlQueryParams = {
      hash,
    };
    return this.executeSingleRowQuery<Url>(sqlQuery, sqlQueryParams);
  }
}

export default UrlModel;
