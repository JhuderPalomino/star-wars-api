import { QuotaConfig } from './QuotaConfig';
import axios, { AxiosInstance } from 'axios';

export class QuotaFactory {
  private static instance: AxiosInstance;

  static createClient(config: QuotaConfig): AxiosInstance {
    try {
      if (!QuotaFactory.instance) {
        QuotaFactory.instance = axios.create({
          baseURL: config.url,
        });
      }

      return QuotaFactory.instance;
    } catch (e) {
      console.log('>Error Axios: ', e);
      throw new Error('Axios error');
    }
  }
}
