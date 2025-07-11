import { RedisClientType } from 'redis';

export class RedisRepository {
  constructor(private _client: RedisClientType<any, any, any>) {}

  protected async connect(): Promise<void> {
    await this._client.connect();
  }
  protected async get(key: string): Promise<string | null> {
    return this._client.get(key);
  }

  protected async set(key: string, value: string, expireSeconds?: number): Promise<void> {
    if (expireSeconds) {
      await this._client.set(key, value, { EX: expireSeconds });
    } else {
      await this._client.set(key, value);
    }
  }

  protected async quit(): Promise<void> {
    await this._client.quit();
  }
}
