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
      nombre: PersonNameMother.random().value,
      anio_nacimiento: PersonBirthYearMother.invalid(),
      color_ojos: PersonEyeColorMother.random().value,
      genero: PersonGenderMother.random().value,
      color_cabello: PersonHairColorMother.random().value,
      altura: PersonHeightMother.random().value,
      masa: PersonMassMother.random().value,
      color_piel: PersonSkinColorMother.random().value,
      fecha_creacion: PersonCreatedMother.random().value,
      fecha_actualizacion: PersonEditedMother.random().value,
    };
  }
}
