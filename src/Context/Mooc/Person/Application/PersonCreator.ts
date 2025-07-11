import { DatabaseRepository } from '../Domain/DatabaseRepository';
import { Person } from '../Domain/Person';
import { PersonName } from '../Domain/PersonName';
import { PersonFoundException } from '../Domain/PersonFoundException';

export class PersonCreator {
  constructor(private readonly personRepository: DatabaseRepository) {}

  async run(
    name: string,
    birth_year: string,
    eye_color: string,
    gender: string,
    hair_color: string,
    height: string,
    mass: string,
    skin_color: string,
    created: string,
    edited: string,
    phrase: string,
  ) {
    const newPerson = Person.fromPrimitives({
      name: name,
      created: created,
      height: height,
      hair_color: hair_color,
      gender: gender,
      eye_color: eye_color,
      birth_year: birth_year,
      skin_color: skin_color,
      mass: mass,
      edited: edited,
      phrase: phrase,
    });
    const personFound = await this.personRepository.findByName(new PersonName(name));

    if (personFound) {
      throw new PersonFoundException(`El personaje ${name} ya está registrado`);
    }

    await this.personRepository.save(newPerson);
    return newPerson.toPrimitives();
  }
}
