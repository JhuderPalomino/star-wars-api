import { PersonName } from '../../../../../src/Context/Mooc/Person/Domain/PersonName';
import { WordMother } from '../../../Shared/Domain/WordMother';

export class PersonNameMother {
  static create(value: string): PersonName {
    return new PersonName(value);
  }

  static random(): PersonName {
    return this.create(WordMother.random({ maxLength: 10 }));
  }
}
