import { PhraseApiRepository } from '../../../../../src/Context/Mooc/Person/Domain/PhraseApiRepository';

export class PhraseApiRepositoryMock implements PhraseApiRepository {
  private readonly getPhraseMock: jest.Mock;
  private phrase: string;

  constructor() {
    this.getPhraseMock = jest.fn();
  }

  async getPhrase(): Promise<string> {
    this.getPhraseMock();
    return this.phrase;
  }
}
