import Redis from 'ioredis/built/Redis';
import redisClient from '../common/config/redis-client';

class CacheService {
  private redisClient: Redis | undefined;
  constructor() {
    this.redisClient = redisClient;
  }

  public async set(key: string, value: string): Promise<void> {
    await this.redisClient?.set(key, value, 'EX', 3600);
  }

  public async get(key: string): Promise<string | undefined | null> {
    return this.redisClient?.get(key);
  }
}

export default CacheService;
