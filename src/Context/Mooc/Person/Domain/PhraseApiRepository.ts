export interface PhraseApiRepository {
  getPhrase(): Promise<string>;
}
