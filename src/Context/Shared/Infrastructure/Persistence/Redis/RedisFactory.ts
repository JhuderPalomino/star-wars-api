import { createClient, RedisClientType } from 'redis';
import { RedisConfig } from './RedisConfig';
export class RedisFactory {
  private static instance: RedisClientType<any, any, any> | null = null;

  static getOrCreateClient(config: RedisConfig): RedisClientType<any, any, any> {
    try {
      if (!RedisFactory.instance) {
        RedisFactory.instance = createClient({
          url: `redis://${config.url}`,
          username: config.username,
          password: config.password,
          socket: config.socket,
        }).on('error', (err) => console.log('Redis Client Error', err));
      }

      return RedisFactory.instance;
    } catch (e) {
      console.log('> Error instancia redis: ', e);
      throw new Error('Internal error');
    }
  }
}
