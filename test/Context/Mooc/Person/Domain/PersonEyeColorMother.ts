import { PersonEyeColor } from '../../../../../src/Context/Mooc/Person/Domain/PersonEyeColor';
import { WordMother } from '../../../Shared/Domain/WordMother';

export class PersonEyeColorMother {
  static create(value: string): PersonEyeColor {
    return new PersonEyeColor(value);
  }

  static random(): PersonEyeColor {
    return this.create(WordMother.random({ maxLength: 5 }));
  }
}
