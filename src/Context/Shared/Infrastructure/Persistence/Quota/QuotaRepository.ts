import { AxiosInstance } from 'axios';

export class QuotaRepository {
  constructor(private _client: AxiosInstance) {}

  protected async search() {
    return await this._client.get('/');
  }
}
