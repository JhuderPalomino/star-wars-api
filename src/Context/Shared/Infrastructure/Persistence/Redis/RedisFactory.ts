import { createClient } from 'redis';
import { RedisConfigFactory } from './RedisConfigFactory';

export class RedisFactory {
  private static instance: ReturnType<typeof createClient> | null = null;

  static async createClient(): Promise<ReturnType<typeof createClient>> {
    if (!RedisFactory.instance) {
      const config = RedisConfigFactory.createConfig();
      
      const client = createClient({
        url: `redis://${config.url}`,
        username: config.username,
        password: config.password,
        socket: config.socket,
      })
        .on('error', err => console.log('Redis Client Error', err))
        .on('reconnecting', _arg => console.log('Reconectando'));
      
      await client.connect();
      RedisFactory.instance = client;
    }
    return RedisFactory.instance!;
  }
} 