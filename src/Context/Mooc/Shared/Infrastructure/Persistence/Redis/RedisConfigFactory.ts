import { RedisConfig } from '../../../../../Shared/Infrastructure/Persistence/Redis/RedisConfig';

export class RedisConfigFactory {
  static createConfig(): RedisConfig {
    return {
      url: process.env.CACHE_URL || 'localhost:6379',
      username: process.env.CACHE_USERNAME,
      password: process.env.CACHE_PASSWORD,
      socket: {
        connectTimeout: 1000,
      },
    };
  }
}
