import { SwapiRepository } from '../../../../Shared/Infrastructure/Persistence/Swapi/SwapiRepository';
import { ExternalApiRepository } from '../../Domain/ExternalApiRepository';
import { Person } from '../../Domain/Person';
import { PersonName } from '../../Domain/PersonName';

export class ExternalPersonApiRepository extends SwapiRepository implements ExternalApiRepository {
  async findByName(name: PersonName): Promise<Person | null> {
    const response = (await this.filterBy(name.value)).data.results;
    if (!response || response.length === 0) {
      return null;
    }

    console.log('response findByName', response[0])

    return Person.fromPrimitive({
      name: response[0].name,
      edited: response[0].edited,
      mass: response[0].mass,
      skin_color: response[0].skin_color,
      birth_year: response[0].birth_year,
      eye_color: response[0].eye_color,
      gender: response[0].gender,
      hair_color: response[0].hair_color,
      height: response[0].height,
      created: response[0].created,
    });
  }
}
