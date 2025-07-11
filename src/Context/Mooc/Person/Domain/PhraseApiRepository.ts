import { PersonPhrase } from "./PersonPhrase";

export interface PhraseApiRepository {
  getPhrase(): Promise<PersonPhrase>;
}
