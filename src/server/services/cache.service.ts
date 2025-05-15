import Redis from 'ioredis/built/Redis';
import createRedisClient from '../common/config/redis-client';
import { DB_INDEX } from '../types/reddis.types';

class CacheService {
  private redisClient: Redis | undefined;
  constructor() {
    this.redisClient = createRedisClient(DB_INDEX.SHORT_URL_DB);
  }

  public async set(key: string, value: string): Promise<void> {
    await this.redisClient?.set(key, value, 'EX', 3600);
  }

  public async get(key: string): Promise<string | undefined | null> {
    return this.redisClient?.get(key);
  }
}

export default CacheService;
