import { PhraseApiRepository } from '../../../../../src/Context/Mooc/Person/Domain/PhraseApiRepository';
import { PersonPhrase } from "../../../../../src/Context/Mooc/Person/Domain/PersonPhrase";

export class PhraseApiRepositoryMock implements PhraseApiRepository {
  private readonly getPhraseMock: jest.Mock;
  private phrase: PersonPhrase;

  constructor() {
    this.getPhraseMock = jest.fn();
  }

  async getPhrase(): Promise<PersonPhrase> {
    this.getPhraseMock();
    return this.phrase;
  }
}
