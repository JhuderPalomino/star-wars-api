import { Person } from '../../../../../src/Context/Mooc/Person/Domain/Person';
import { PersonNameMother } from './PersonNameMother';
import { PersonBirthYearMother } from './PersonBirthYearMother';
import { PersonEyeColorMother } from './PersonEyeColorMother';
import { PersonGenderMother } from './PersonGenderMother';
import { PersonHairColorMother } from './PersonHairColorMother';
import { PersonHeightMother } from './PersonHeightMother';
import { PersonMassMother } from './PersonMassMother';
import { PersonSkinColorMother } from './PersonSkinColorMother';
import { PersonCreatedMother } from './PersonCreatedMother';
import { PersonEditedMother } from './PersonEditedMother';

export class PersonMother {
  static random(): Person {
    return new Person(
      PersonNameMother.random(),
      PersonBirthYearMother.random(),
      PersonEyeColorMother.random(),
      PersonGenderMother.random(),
      PersonHairColorMother.random(),
      PersonHeightMother.random(),
      PersonMassMother.random(),
      PersonSkinColorMother.random(),
      PersonCreatedMother.random(),
      PersonEditedMother.random(),
    );
  }

  static invalidBirthYear(): any {
    return {
      name: PersonNameMother.random().value,
      birth_year: PersonBirthYearMother.invalid(),
      eye_color: PersonEyeColorMother.random().value,
      gender: PersonGenderMother.random().value,
      hair_color: PersonHairColorMother.random().value,
      height: PersonHeightMother.random().value,
      mass: PersonMassMother.random().value,
      skin_color: PersonSkinColorMother.random().value,
      created: PersonCreatedMother.random().value,
      edited: PersonEditedMother.random().value,
    };
  }
}
