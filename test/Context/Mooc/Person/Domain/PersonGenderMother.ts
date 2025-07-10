import { PersonGender } from '../../../../../src/Context/Mooc/Person/Domain/PersonGender';
import { MotherCreator } from '../../../Shared/Domain/MotherCreator';

export class PersonGenderMother {
  static create(value: string) {
    return new PersonGender(value);
  }

  static random() {
    return this.create(
      MotherCreator.random().helpers.arrayElement(['Male', 'Female', 'unknown', 'n/a']),
    );
  }
}
