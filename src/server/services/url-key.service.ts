import UrlModel from '../models/url.model';
import { BaseError, NotFoundError } from '../common/errors';
import { HASH_RETRIES } from '../common/constants';
import Redis from 'ioredis/built/Redis';
import RabbitMqService from './rabbit-mq.service';
import { UrlKey } from '../models/url-key.model';
import createRedisClient from '../common/config/redis-client';
import { DB_INDEX } from '../types/reddis.types';

class UrlKeyService {
  private urlModel: UrlModel;
  private hashRetries: number = HASH_RETRIES;
  private redisClient: Redis;
  public static HASH_KEY: string = 'hashes';
  constructor(urlModel: UrlModel) {
    this.urlModel = urlModel;
    this.redisClient = createRedisClient(DB_INDEX.HASHES_DB);
  }

  public async getUrlHash(originalUrl: string): Promise<string> {
    if (this.hashRetries < 1) {
      throw new BaseError('Too many url hash retries.');
    }

    let urlHash: string | null = await this.getUrlHashFromCache();

    if (!urlHash) {
      urlHash = await this.getUrlHashFromDb();
    }

    if (!urlHash) {
      throw new NotFoundError('No url key was provided.');
    }

    const { exists: existingHash }: { exists: boolean } = await this.urlModel.existingUrlHash(urlHash);
    if (existingHash) {
      this.hashRetries -= 1;
      return await this.getUrlHash(originalUrl);
    }

    return urlHash;
  }

  private async getUrlHashFromCache(): Promise<string | null> {
    const availableHashesCount: number = await this.redisClient.scard(UrlKeyService.HASH_KEY);
    if (availableHashesCount < 100) {
      RabbitMqService.createHashes();
    }
    return this.redisClient.spop(UrlKeyService.HASH_KEY);
  }

  private async getUrlHashFromDb(): Promise<string> {
    const urlKey: string | null = await UrlKey.findOne({ used: false });
    if (!urlKey) {
      throw new NotFoundError('No url key was provided.');
    }
    return urlKey;
  }
}

export default UrlKeyService;
