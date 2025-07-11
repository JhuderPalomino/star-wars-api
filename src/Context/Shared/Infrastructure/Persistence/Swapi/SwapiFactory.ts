import { SwapiConfig } from './SwapiConfig';
import axios, { AxiosInstance } from 'axios';

export class SwapiFactory {
  private static instance: AxiosInstance;

  static createClient(config: SwapiConfig): AxiosInstance {
    try {
      if (!SwapiFactory.instance) {
        SwapiFactory.instance = axios.create({
          baseURL: config.url,
        });
      }

      return SwapiFactory.instance;
    } catch (e) {
      console.log('>Error Axios: ', e);
      throw new Error('Axios error');
    }
  }
}
