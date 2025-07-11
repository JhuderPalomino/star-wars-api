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
import { PersonPhrase } from "./PersonPhrase";

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
  readonly phrase: PersonPhrase;

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
    phrase: PersonPhrase
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
    this.phrase = phrase;
  }

  static fromPrimitives(plainDate: {
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
    phrase: string;
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
      new PersonPhrase(plainDate.phrase)
    );
  }



  toPrimitives(): any {
    return {
      name: this.name.value,
      birth_year: this.birth_year.value,
      eye_color: this.eye_color.value,
      gender: this.gender.value,
      hair_color: this.hair_color.value,
      height: this.height.value,
      mass: this.mass.value,
      skin_color: this.skin_color.value,
      created: this.created.value,
      edited: this.edited.value,
      phrase: this.phrase.value
    };
  }
}
