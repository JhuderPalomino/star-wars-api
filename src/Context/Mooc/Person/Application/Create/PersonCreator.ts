import { DataBaseRepository } from '../../Domain/DataBaseRepository';
import { Person } from '../../Domain/Person';
import { PersonName } from '../../Domain/PersonName';
import { PersonFoundException } from '../../Domain/PersonFoundException';

export class PersonCreator {
  constructor(private readonly personRepository: DataBaseRepository) {}

  async run(
    nombre: string,
    anio_nacimiento: string,
    color_ojos: string,
    genero: string,
    color_cabello: string,
    altura: string,
    masa: string,
    color_piel: string,
    fecha_creacion: string,
    fecha_actualizacion: string,
  ) {
    const newPerson = Person.fromPrimitive({
      name: nombre,
      created: fecha_creacion,
      height: altura,
      hair_color: color_cabello,
      gender: genero,
      eye_color: color_ojos,
      birth_year: anio_nacimiento,
      skin_color: color_piel,
      mass: masa,
      edited: fecha_actualizacion,
    });
    const personFound = await this.personRepository.findByName(new PersonName(nombre));

    if (personFound) {
      throw new PersonFoundException(`El personaje ${nombre} ya está registrado`);
    }

    await this.personRepository.save(newPerson);
    return newPerson.toPrimitivesSpanish();
  }
}
