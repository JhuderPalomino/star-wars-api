import { AxiosInstance } from 'axios';

export class SwapiRepository {
  constructor(private _client: AxiosInstance) {}

  protected client(): AxiosInstance {
    return this._client;
  }

  protected async filterBy(search: string) {
    return await this._client.get(`/?search=${search}`);
  }
}
