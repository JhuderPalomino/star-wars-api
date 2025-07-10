import { PersonHairColor } from '../../../../../src/Context/Mooc/Person/Domain/PersonHairColor';
import { WordMother } from '../../../Shared/Domain/WordMother';
import { MotherCreator } from '../../../Shared/Domain/MotherCreator';

export class PersonHairColorMother {
  static create(value: string): PersonHairColor {
    return new PersonHairColor(value);
  }

  static random(): PersonHairColor {
    let value = WordMother.random({ maxLength: 5 });
    const randomNumber = MotherCreator.random().number.int(10);
    if (randomNumber < 5) {
      value = MotherCreator.random().helpers.arrayElement(['unknown', 'n/a']);
    }
    return this.create(value);
  }
}
