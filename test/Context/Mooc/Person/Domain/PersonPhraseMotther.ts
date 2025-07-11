import { WordMother } from '../../../Shared/Domain/WordMother';
import { PersonPhrase } from '../../../../../src/Context/Mooc/Person/Domain/PersonPhrase';

export class PersonPhraseMother {
  static create(value: string): PersonPhrase {
    return new PersonPhrase(value);
  }

  static random(): PersonPhrase {
    return this.create(WordMother.random({ maxLength: 10 }));
  }
}
