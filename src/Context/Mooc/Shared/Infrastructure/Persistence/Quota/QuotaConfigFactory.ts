import { QuotaConfig } from '../../../../../Shared/Infrastructure/Persistence/Quota/QuotaConfig';

export class QuotaConfigFactory {
  static createConfig(): QuotaConfig {
    return {
      url: 'https://ron-swanson-quotes.herokuapp.com/v2/quotes',
    };
  }
}
