import { PersonName } from './PersonName';
import { PersonBirthYear } from './PersonBirthYear';
import { PersonEyeColor } from './PersonEyeColor';
import { PersonGender } from './PersonGender';
import { PersonHairColor } from './PersonHairColor';
import { PersonHeight } from './PersonHeight';
import { PersonMass } from './PersonMass';
import { PersonSkinColor } from './PersonSkinColor';
import { PersonCreated } from './PersonCreated';
import { PersonEdited } from './PersonEdited';

export class Person {
  readonly name: PersonName;
  readonly birth_year: PersonBirthYear;
  readonly eye_color: PersonEyeColor;
  readonly gender: PersonGender;
  readonly hair_color: PersonHairColor;
  readonly height: PersonHeight;
  readonly mass: PersonMass;
  readonly skin_color: PersonSkinColor;
  readonly created: PersonCreated;
  readonly edited: PersonEdited;

  constructor(
    name: PersonName,
    birth_year: PersonBirthYear,
    eye_color: PersonEyeColor,
    gender: PersonGender,
    hair_color: PersonHairColor,
    height: PersonHeight,
    mass: PersonMass,
    skin_color: PersonSkinColor,
    created: PersonCreated,
    edited: PersonEdited,
  ) {
    this.name = name;
    this.height = height;
    this.mass = mass;
    this.hair_color = hair_color;
    this.skin_color = skin_color;
    this.eye_color = eye_color;
    this.birth_year = birth_year;
    this.gender = gender;
    this.created = created;
    this.edited = edited;
  }

  static fromPrimitive(plainDate: {
    name: string;
    birth_year: string;
    eye_color: string;
    gender: string;
    hair_color: string;
    height: string;
    mass: string;
    skin_color: string;
    created: string;
    edited: string;
  }): Person {
    return new Person(
      new PersonName(plainDate.name),
      new PersonBirthYear(plainDate.birth_year),
      new PersonEyeColor(plainDate.eye_color),
      new PersonGender(plainDate.gender),
      new PersonHairColor(plainDate.hair_color),
      new PersonHeight(plainDate.height),
      new PersonMass(plainDate.mass),
      new PersonSkinColor(plainDate.skin_color),
      new PersonCreated(plainDate.created),
      new PersonEdited(plainDate.edited),
    );
  }

  toPrimitivesSpanish(): any {
    return {
      nombre: this.name.value,
      anio_nacimiento: this.birth_year.value,
      color_ojos: this.eye_color.value,
      genero: this.gender.value,
      color_cabello: this.hair_color.value,
      altura: this.height.value,
      masa: this.mass.value,
      color_piel: this.skin_color.value,
      fecha_creacion: this.created.value,
      fecha_actualizacion: this.edited.value,
    };
  }
}
