import { DataBaseRepository } from '../../Domain/DataBaseRepository';
import { ExternalApiRepository } from '../../Domain/ExternalApiRepository';
import { PersonName } from '../../Domain/PersonName';
import { Person } from '../../Domain/Person';
import { PersonNotFoundException } from '../../Domain/PersonNotFoundException';

export class SearchPersonByName {
  constructor(
    private readonly personRepository: DataBaseRepository,
    private readonly apiRepository: ExternalApiRepository,
  ) {}

  async run(name: PersonName) {
    const personFound = await this.personRepository.findByName(name);
    let personApi: Person | null = null;
    if (personFound) {
      return personFound.toPrimitivesSpanish();
    }
    personApi = await this.apiRepository.findByName(name);
    if (!personApi && !personFound) {
      throw new PersonNotFoundException('El personaje no ha sido encontrado');
    }

    personApi && (await this.personRepository.save(personApi));

    return personApi?.toPrimitivesSpanish();
  }
}
