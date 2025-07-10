import { PersonSkinColor } from '../../../../../src/Context/Mooc/Person/Domain/PersonSkinColor';
import { WordMother } from '../../../Shared/Domain/WordMother';

export class PersonSkinColorMother {
  static create(value: string): PersonSkinColor {
    return new PersonSkinColor(value);
  }

  static random() {
    return this.create(WordMother.random({ maxLength: 10 }));
  }
}
