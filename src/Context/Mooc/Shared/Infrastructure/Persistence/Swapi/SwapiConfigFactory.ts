import { SwapiConfig } from '../../../../../Shared/Infrastructure/Persistence/Swapi/SwapiConfig';

export class SwapiConfigFactory {
  static createConfig(): SwapiConfig {
    return {
      url: 'https://swapi.py4e.com/api/people',
    };
  }
}
