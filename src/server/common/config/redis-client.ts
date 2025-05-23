import Redis from 'ioredis';
import { RedisError } from '../errors';

const createRedisClient = (dbIndex: number): Redis | undefined => {
  if (process.env.NODE_ENV === 'test') return;
  if (dbIndex == null) {
    throw new RedisError('No db index was provided.');
  }
  return new Redis({
    host: 'localhost', // For local development
    port: 6379, // Default Redis port
    db: dbIndex,
  });
};

export default createRedisClient;
