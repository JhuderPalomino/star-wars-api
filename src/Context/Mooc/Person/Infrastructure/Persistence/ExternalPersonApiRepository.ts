import { SwapiRepository } from '../../../../Shared/Infrastructure/Persistence/Swapi/SwapiRepository';
import { PersonApiRepository } from '../../Domain/PersonApiRepository';
import { Person } from '../../Domain/Person';
import { PersonName } from '../../Domain/PersonName';

export class ExternalPersonApiRepository extends SwapiRepository implements PersonApiRepository {
  async findByName(name: PersonName): Promise<Person | null> {
    const response = (await this.filterBy(name.value)).data.results;
    if (!response || response.length === 0) {
      return null;
    }

    if (!response || response.length === 0) {
      return null;
    }
    const row = response[0];

    return Person.fromPrimitives({
      name: row.name,
      edited: row.edited,
      mass: row.mass,
      skin_color: row.skin_color,
      birth_year: row.birth_year,
      eye_color: row.eye_color,
      gender: row.gender,
      hair_color: row.hair_color,
      height: row.height,
      created: row.created,
    });
  }
}
