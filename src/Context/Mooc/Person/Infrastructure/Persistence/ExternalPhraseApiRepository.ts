import { QuotaRepository } from '../../../../Shared/Infrastructure/Persistence/Quota/QuotaRepository';
import { PhraseApiRepository } from '../../Domain/PhraseApiRepository';
import { PersonPhrase } from "../../Domain/PersonPhrase";

export class ExternalPhraseApiRepository extends QuotaRepository implements PhraseApiRepository {
  async getPhrase(): Promise<PersonPhrase> {
    const response = (await this.search()).data;

    if (!response || response.length === 0) {
      return new PersonPhrase('')
    }

    return new PersonPhrase(response[0])
  }
}
