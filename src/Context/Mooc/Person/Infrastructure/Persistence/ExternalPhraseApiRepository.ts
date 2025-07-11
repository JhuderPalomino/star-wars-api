import { QuotaRepository } from '../../../../Shared/Infrastructure/Persistence/Quota/QuotaRepository';
import { PhraseApiRepository } from '../../Domain/PhraseApiRepository';

export class ExternalPhraseApiRepository extends QuotaRepository implements PhraseApiRepository {
  async getPhrase(): Promise<string> {
    const response = (await this.search()).data;

    if (!response || response.length === 0) {
      return '';
    }

    return response[0];
  }
}
